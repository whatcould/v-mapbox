<template>
  <div>
    <slot />
  </div>
</template>
<script lang="ts">
  import type {
    AnyLayer,
    GeoJSONSourceRaw,
    MapLayerEventType,
  } from 'mapbox-gl';
  import type { PropType, Ref } from 'vue';
  import { defineComponent, onMounted, onBeforeUnmount, ref, watch } from 'vue';
  import { injectStrict, MapKey } from '../../utils';
  import { mapLayerEvents } from '../../constants/events';

  export default defineComponent({
    name: 'VLayerMapboxGeojson',
    props: {
      sourceId: {
        type: String as PropType<string>,
        default: 'mapbox.gl-geojson-source',
        required: true,
      },
      layerId: {
        type: String as PropType<string>,
        default: 'mapbox.gl-geojson-layer',
        required: true,
      },
      source: {
        type: Object as PropType<GeoJSONSourceRaw>,
        required: true,
      },
      layer: {
        type: Object as PropType<AnyLayer>,
        default: () => ({}),
        required: true,
      },
      before: {
        type: String as PropType<string>,
        default: '',
        required: false,
      },
    },
    setup(props, { emit }) {
      let map = injectStrict(MapKey);
      let loaded: Ref<boolean> = ref(false);
      let events: Ref<Array<keyof MapLayerEventType>> = ref(mapLayerEvents);

      const layer = {
        ...props.layer,
        id: props.layerId,
        source: props.sourceId,
      };

      map.value.on('style.load', () => {
        // https://github.com/mapbox/mapbox-gl-js/issues/2268#issuecomment-401979967
        const styleTimeout = () => {
          if (!map.value.isStyleLoaded()) {
            loaded.value = false;
            setTimeout(styleTimeout, 200);
          } else {
            loaded.value = true;
          }
        };
        styleTimeout();
      });

      /**
       * Watcher(s)
       */
      watch(loaded, (value) => {
        if (value) {
          addLayer();
        }
      });

      watch(() => props.source, (source, prevSource) => {
        map.value.getSource(props.sourceId).setData(source.data)
      });

      onMounted(() => {
        addLayer();
        listenLayerEvents();
      });

      /**
       * Listen to layer events
       *
       * @returns {void}
       */
      function listenLayerEvents(): void {
        // Listen for events
        events.value.forEach((e) => {
          map.value.on(e, props.layerId, (evt) => {
            emit(e, evt);
          });
        });
      }

      onBeforeUnmount(() => {
        removeLayer()
      });

      function removeLayer(): void {
        if (map.value.getLayer(props.layerId)) {
          map.value.removeLayer(props.layerId);
          map.value.removeSource(props.sourceId);
        }
      };
      /**
       * Re–adds the layer when style changed
       *
       * @returns {void}
       */
      function addLayer(): void {
        map.value.addSource(props.sourceId, props.source);
        map.value.addLayer(layer, props.before);
      }
    },
  });
</script>
