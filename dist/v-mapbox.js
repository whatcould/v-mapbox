/*!
* v-mapbox v3.3.1
* (c) 2023 GeoSpoc Dev Team
* @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mapbox-gl'), require('vue'), require('@deck.gl/layers'), require('@deck.gl/mapbox')) :
  typeof define === 'function' && define.amd ? define(['exports', 'mapbox-gl', 'vue', '@deck.gl/layers', '@deck.gl/mapbox'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VMapbox = {}, global.mapboxGl, global.vue, global.deckGlLayers, global.deckGlMapbox));
})(this, (function (exports, mapboxGl, vue, layers, mapbox) { 'use strict';

  const MapKey = Symbol('Map');

  /**
   * Dependency injection 🥳
   *
   * @param {InjectionKey} key - The key to inject
   * @param {string | undefined} fallback - The fallback value
   * @returns {undefined} - The value
   */
  function injectStrict(key, fallback) {
    const resolved = vue.inject(key, fallback);
    if (!resolved) {
      throw new Error(`Could not resolve ${key.description}`);
    }
    return resolved;
  }

  var script$f = vue.defineComponent({
      name: 'VControlAttribution',
      props: {
        options: {
          type: Object 


  ,
          default: () => ({
            compact: false,
            customAttribution: 'Map design by me',
          }),
          required: true,
        },
        position: {
          type: String 

  ,
          default: () => 'bottom-right',
          required: false,
        },
      },
      setup(props, { slots }) {
        let map = injectStrict(MapKey);

        vue.onMounted(() => {
          addControl();
        });

        /**
         * Adds the Attribution Control
         *
         * @returns {void}
         */
        function addControl() {
          const options = {
            ...props.options,
          };
          if (slots && slots.default() && Array.isArray(slots.default())) {
            // @ts-ignore
            options.customAttribution = slots.default().at(0).el.data;
          }
          const control = new mapboxGl.AttributionControl(options);
          map.value.addControl(control, props.position);
        }
      },
    });

  function render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ]))
  }

  script$f.render = render$9;
  script$f.__file = "src/controls/VControlAttribution.vue";

  var script$e = vue.defineComponent({
      name: 'VControlFullscreen',
      props: {
        options: {
          type: Object ,
          default: () => ({}),
          required: true,
        },
        position: {
          type: String 

  ,
          default: () => 'top-left',
          required: false,
        },
      },
      setup(props) {
        let map = injectStrict(MapKey);

        vue.onMounted(() => {
          addControl();
        });

        /**
         * Adds the Attribution Control
         *
         * @returns {void}
         */
        function addControl() {
          const control = new mapboxGl.FullscreenControl(props.options);
          map.value.addControl(control, props.position);
        }
      },
    });

  script$e.__file = "src/controls/VControlFullscreen.vue";

  const geolocateControlEvents = [
    'geolocate',
    'error',
    'outofmaxbounds',
    'trackuserlocationstart',
    'trackuserlocationend',
  ];

  var script$d = vue.defineComponent({
      name: 'VControlFullscreen',
      props: {
        options: {
          type: Object 





  ,
          default: () => ({}),
          required: true,
        },
        position: {
          type: String 

  ,
          default: () => 'top-left',
          required: false,
        },
      },
      setup(props, { emit }) {
        let map = injectStrict(MapKey);

        vue.onMounted(() => {
          addControl();
        });

        /**
         * Adds the Attribution Control
         *
         * @returns {void}
         */
        function addControl() {
          const control = new mapboxGl.GeolocateControl(props.options);
          map.value.addControl(control, props.position);
          geolocateControlEvents.forEach((event) => {
            control.on(event, () => {
              emit(event);
            });
          });
        }
      },
    });

  script$d.__file = "src/controls/VControlGeolocate.vue";

  var script$c = vue.defineComponent({
      name: 'VControlFullscreen',
      props: {
        options: {
          type: Object 



  ,
          default: () => ({}),
          required: true,
        },
        position: {
          type: String 

  ,
          default: () => 'top-left',
          required: false,
        },
      },
      setup(props) {
        let map = injectStrict(MapKey);

        vue.onMounted(() => {
          addControl();
        });

        /**
         * Adds the Attribution Control
         *
         * @returns {void}
         */
        function addControl() {
          const control = new mapboxGl.NavigationControl(props.options);
          map.value.addControl(control, props.position);
        }
      },
    });

  script$c.__file = "src/controls/VControlNavigation.vue";

  var script$b = vue.defineComponent({
      name: 'VControlFullscreen',
      props: {
        options: {
          type: Object ,
          default: () => ({}),
          required: true,
        },
        position: {
          type: String 

  ,
          default: () => 'bottom-left',
          required: false,
        },
      },
      setup(props) {
        let map = injectStrict(MapKey);

        vue.onMounted(() => {
          addControl();
        });

        /**
         * Adds the Attribution Control
         *
         * @returns {void}
         */
        function addControl() {
          const control = new mapboxGl.ScaleControl(props.options);
          map.value.addControl(control, props.position);
        }
      },
    });

  script$b.__file = "src/controls/VControlScale.vue";

  var script$a = vue.defineComponent({
      name: 'VLayerDeckArc',
      props: {
        layerId: {
          type: String ,
          default: 'deck.gl-arc-layer',
          required: true,
        },
        data: {
          type: Object ,
          required: true,
        },
        options: {
          type: Object,
          required: true,
        },
        before: {
          type: String ,
          default: '',
          required: false,
        },
      },
      setup(props) {
        let map = injectStrict(MapKey);
        let loaded = vue.ref(false);

        const layer = new mapbox.MapboxLayer({
          ...props.options,
          id: props.layerId,
          data: props.data,
          type: layers.ArcLayer,
        });

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
        vue.watch(loaded, (value) => {
          if (value) {
            addLayer();
          }
        });

        vue.onMounted(() => {
          addLayer();
        });

        /**
         * Re–adds the layer when style changed
         *
         * @returns {void}
         */
        function addLayer() {
          map.value.addLayer(layer, props.before);
        }
      },
    });

  script$a.__file = "src/layers/deck.gl/VLayerDeckArc.vue";

  var script$9 = vue.defineComponent({
      name: 'VLayerDeckGeojson',
      props: {
        layerId: {
          type: String ,
          default: 'deck.gl-geojson-layer',
          required: true,
        },
        data: {
          type: Object ,
          required: true,
        },
        options: {
          type: Object,
          required: true,
        },
        before: {
          type: String ,
          default: '',
          required: false,
        },
      },
      setup(props) {
        let map = injectStrict(MapKey);
        let loaded = vue.ref(false);

        const layer = new mapbox.MapboxLayer({
          ...props.options,
          id: props.layerId,
          data: props.data,
          type: layers.GeoJsonLayer,
        });

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
        vue.watch(loaded, (value) => {
          if (value) {
            addLayer();
          }
        });

        vue.onMounted(() => {
          addLayer();
        });

        /**
         * Re–adds the layer when style changed
         *
         * @returns {void}
         */
        function addLayer() {
          map.value.addLayer(layer, props.before);
        }
      },
    });

  script$9.__file = "src/layers/deck.gl/VLayerDeckGeojson.vue";

  var script$8 = vue.defineComponent({
      name: 'VLayerMapboxCanvas',
      props: {
        sourceId: {
          type: String ,
          default: 'mapbox.gl-canvas-source',
          required: true,
        },
        layerId: {
          type: String ,
          default: 'mapbox.gl-canvas-layer',
          required: true,
        },
        source: {
          type: Object ,
          required: true,
        },
        layer: {
          type: Object ,
          default: () => ({}),
          required: true,
        },
        before: {
          type: String ,
          default: '',
          required: false,
        },
      },
      setup(props) {
        let map = injectStrict(MapKey);
        let loaded = vue.ref(false);

        const layer = {
          ...props.layer,
          id: props.layerId,
          source: props.sourceId,
        };
        const source = {
          type: 'geojson',
          data: props.source,
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
        vue.watch(loaded, (value) => {
          if (value) {
            addLayer();
          }
        });

        vue.onMounted(() => {
          addLayer();
        });

        /**
         * Re–adds the layer when style changed
         *
         * @returns {void}
         */
        function addLayer() {
          map.value.addSource(props.sourceId, source);
          map.value.addLayer(layer, props.before);
        }
      },
    });

  function render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ]))
  }

  script$8.render = render$8;
  script$8.__file = "src/layers/mapbox/VLayerMapboxCanvas.vue";

  const mapLayerEvents = [
    'click',
    'dblclick',
    'mousedown',
    'mouseup',
    'mousemove',
    'mouseenter',
    'mouseleave',
    'mouseover',
    'mouseout',
    'contextmenu',
    'touchstart',
    'touchend',
    'touchcancel',
  ];

  const mapEvents = [
    'error',
    'load',
    'idle',
    'remove',
    'render',
    'resize',
    'webglcontextlost',
    'webglcontextrestored',
    'dataloading',
    'data',
    'tiledataloading',
    'sourcedataloading',
    'styledataloading',
    'sourcedata',
    'styledata',
    'boxzoomcancel',
    'boxzoomstart',
    'boxzoomend',
    'touchcancel',
    'touchmove',
    'touchend',
    'touchstart',
    'click',
    'contextmenu',
    'dblclick',
    'mousemove',
    'mouseup',
    'mousedown',
    'mouseout',
    'mouseover',
    'movestart',
    'move',
    'moveend',
    'zoomstart',
    'zoom',
    'zoomend',
    'rotatestart',
    'rotate',
    'rotateend',
    'dragstart',
    'drag',
    'dragend',
    'pitchstart',
    'pitch',
    'pitchend',
    'wheel',
  ];

  const markerMapEvents = ['dragstart', 'drag', 'dragend'];
  const markerDOMEvents = ['click', 'mouseenter', 'mouseleave'];

  const popupEvents = ['open', 'close'];

  var script$7 = vue.defineComponent({
      name: 'VLayerMapboxGeojson',
      props: {
        sourceId: {
          type: String ,
          default: 'mapbox.gl-geojson-source',
          required: true,
        },
        layerId: {
          type: String ,
          default: 'mapbox.gl-geojson-layer',
          required: true,
        },
        source: {
          type: Object ,
          required: true,
        },
        layer: {
          type: Object ,
          default: () => ({}),
          required: true,
        },
        before: {
          type: String ,
          default: '',
          required: false,
        },
      },
      setup(props, { emit }) {
        let map = injectStrict(MapKey);
        let loaded = vue.ref(false);
        let events = vue.ref(mapLayerEvents);

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
        vue.watch(loaded, (value) => {
          if (value) {
            addLayer();
          }
        });

        vue.watch(() => props.source, (source, prevSource) => {
          map.value.getSource(props.sourceId).setData(source.data);
        });

        vue.onMounted(() => {
          addLayer();
          listenLayerEvents();
        });

        /**
         * Listen to layer events
         *
         * @returns {void}
         */
        function listenLayerEvents() {
          // Listen for events
          events.value.forEach((e) => {
            map.value.on(e, props.layerId, (evt) => {
              emit(e, evt);
            });
          });
        }

        vue.onBeforeUnmount(() => {
          removeLayer();
        });

        function removeLayer() {
          if (map.value.getLayer(props.layerId)) {
            map.value.removeLayer(props.layerId);
            map.value.removeSource(props.sourceId);
          }
        }      /**
         * Re–adds the layer when style changed
         *
         * @returns {void}
         */
        function addLayer() {
          map.value.addSource(props.sourceId, props.source);
          map.value.addLayer(layer, props.before);
        }
      },
    });

  function render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ]))
  }

  script$7.render = render$7;
  script$7.__file = "src/layers/mapbox/VLayerMapboxGeojson.vue";

  var script$6 = vue.defineComponent({
      name: 'VLayerMapboxImage',
      props: {
        sourceId: {
          type: String ,
          default: 'mapbox.gl-image-source',
          required: true,
        },
        layerId: {
          type: String ,
          default: 'mapbox.gl-image-layer',
          required: true,
        },
        source: {
          type: Object ,
          required: true,
        },
        layer: {
          type: Object ,
          default: () => ({}),
          required: true,
        },
        before: {
          type: String ,
          default: '',
          required: false,
        },
      },
      setup(props) {
        let map = injectStrict(MapKey);
        let loaded = vue.ref(false);

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
        vue.watch(loaded, (value) => {
          if (value) {
            addLayer();
          }
        });

        vue.onMounted(() => {
          addLayer();
        });

        /**
         * Re–adds the layer when style changed
         *
         * @returns {void}
         */
        function addLayer() {
          map.value.addSource(props.sourceId, props.source);
          map.value.addLayer(layer, props.before);
        }
      },
    });

  function render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ]))
  }

  script$6.render = render$6;
  script$6.__file = "src/layers/mapbox/VLayerMapboxImage.vue";

  var script$5 = vue.defineComponent({
      name: 'VLayerMapboxRaster',
      props: {
        sourceId: {
          type: String ,
          default: 'mapbox.gl-raster-source',
          required: true,
        },
        layerId: {
          type: String ,
          default: 'mapbox.gl-raster-layer',
          required: true,
        },
        source: {
          type: Object ,
          required: true,
        },
        layer: {
          type: Object ,
          default: () => ({}),
          required: true,
        },
        before: {
          type: String ,
          default: '',
          required: false,
        },
      },
      setup(props) {
        let map = injectStrict(MapKey);
        let loaded = vue.ref(false);

        const layer = {
          ...props.layer,
          id: props.layerId,
          source: props.sourceId,
        };
        const source = {
          type: 'geojson',
          data: props.source,
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
        vue.watch(loaded, (value) => {
          if (value) {
            addLayer();
          }
        });

        vue.onMounted(() => {
          addLayer();
        });

        /**
         * Re–adds the layer when style changed
         *
         * @returns {void}
         */
        function addLayer() {
          map.value.addSource(props.sourceId, source);
          map.value.addLayer(layer, props.before);
        }
      },
    });

  function render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ]))
  }

  script$5.render = render$5;
  script$5.__file = "src/layers/mapbox/VLayerMapboxRaster.vue";

  var script$4 = vue.defineComponent({
      name: 'VLayerMapboxVector',
      props: {
        sourceId: {
          type: String ,
          default: 'mapbox.gl-vector-source',
          required: true,
        },
        layerId: {
          type: String ,
          default: 'mapbox.gl-vector-layer',
          required: true,
        },
        source: {
          type: Object ,
          required: true,
        },
        layer: {
          type: Object ,
          default: () => ({}),
          required: true,
        },
        before: {
          type: String ,
          default: '',
          required: false,
        },
      },
      setup(props) {
        let map = injectStrict(MapKey);
        let loaded = vue.ref(false);

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
        vue.watch(loaded, (value) => {
          if (value) {
            addLayer();
          }
        });

        vue.onMounted(() => {
          addLayer();
        });

        /**
         * Re–adds the layer when style changed
         *
         * @returns {void}
         */
        function addLayer() {
          map.value.addSource(props.sourceId, props.source);
          map.value.addLayer(layer, props.before);
        }
      },
    });

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ]))
  }

  script$4.render = render$4;
  script$4.__file = "src/layers/mapbox/VLayerMapboxVector.vue";

  var script$3 = vue.defineComponent({
      name: 'VLayerMapboxVideo',
      props: {
        sourceId: {
          type: String ,
          default: 'mapbox.gl-video-source',
          required: true,
        },
        layerId: {
          type: String ,
          default: 'mapbox.gl-video-layer',
          required: true,
        },
        source: {
          type: Object ,
          required: true,
        },
        layer: {
          type: Object ,
          default: () => ({}),
          required: true,
        },
        before: {
          type: String ,
          default: '',
          required: false,
        },
      },
      setup(props) {
        let map = injectStrict(MapKey);
        let loaded = vue.ref(false);

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
        vue.watch(loaded, (value) => {
          if (value) {
            addLayer();
          }
        });

        vue.onMounted(() => {
          addLayer();
        });

        /**
         * Re–adds the layer when style changed
         *
         * @returns {void}
         */
        function addLayer() {
          map.value.addSource(props.sourceId, props.source);
          map.value.addLayer(layer, props.before);
        }
      },
    });

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ]))
  }

  script$3.render = render$3;
  script$3.__file = "src/layers/mapbox/VLayerMapboxVideo.vue";

  var script$2 = vue.defineComponent({
      name: 'VMap',
      props: {
        options: {
          type: Object ,
          required: true,
          default: () => ({}),
        },
      },
      setup(props, { emit }) {
        let map = vue.ref({} );
        let loaded = vue.ref(false);
        let events = vue.ref(mapEvents);

        vue.onMounted(() => {
          const options =
            'container' in props.options
              ? props.options
              : { ...props.options, container: 'map' };
          map.value = new mapboxGl.Map(options);
          loaded.value = true;
          vue.provide(MapKey, map);
          listenMapEvents();
        });

        /**
         * Listen to map events
         *
         * @returns {void}
         */
        function listenMapEvents() {
          // Listen for events
          events.value.forEach((e) => {
            map.value.on(e, (evt) => {
              switch (e) {
                case 'load':
                  emit('loaded', map.value);
                  break;
                default:
                  emit(e, evt);
                  break;
              }
            });
          });
        }

        /**
         * Gets the container element
         *
         * @returns {string} - The container element id
         */
        const getContainer = () => {
          if (Object.keys(props.options).includes('container')) {
            return `${props.options.container}`;
          }
          return 'map';
        };

        return {
          getContainer,
        };
      },
    });

  const _hoisted_1$2 = ["id"];

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", {
      id: _ctx.getContainer(),
      class: "v-map-container"
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 8 /* PROPS */, _hoisted_1$2))
  }

  script$2.render = render$2;
  script$2.__file = "src/map/VMap.vue";

  var script$1 = vue.defineComponent({
      name: 'VPopup',
      props: {
        marker: {
          type: Object ,
          default: () => ({} ),
          required: false,
        },
        options: {
          type: Object ,
          default: () => ({} ),
          required: true,
        },
        coordinates: {
          type: Object ,
          default: () => ({}),
          required: true,
        },
      },
      setup(props, { emit }) {
        let map = injectStrict(MapKey);
        let popup = new mapboxGl.Popup(props.options);
        let loaded = vue.ref(true);
        const content = vue.ref(null);

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

        vue.onMounted(() => {
          if (loaded.value) {
            setPopupContent();
            setPopupCoordinates();
            addToMarker();
            listenPopupEvents();
          } else {
            remove();
            removePopupEvents();
          }
        });

        vue.onBeforeUnmount(() => {
          remove();
          removePopupEvents();
        });

        /**
         * Sets the HTML content for the popup
         *
         * @returns {void}
         */
        function setPopupContent() {
          popup.setDOMContent(content.value );
        }
        /**
         * Set popup coordinates
         *
         * @returns {void}
         */
        function setPopupCoordinates() {
          popup.setLngLat(props.coordinates);
        }

        /**
         * Add popup to marker if marker exists
         * else add it to the map.
         *
         * @returns {void}
         */
        function addToMarker() {
          if (props.marker && Object.keys(props.marker).length !== 0) {
            props.marker.setPopup(popup);
          } else {
            popup.addTo(map.value);
          }
          emit('added', { popup });
        }
        /**
         * Remove popup from map
         *
         * @returns {void}
         */
        function remove() {
          popup.remove();
          emit('removed');
        }

        /**
         * Listen to events
         *
         * @returns {void}
         */
        function listenPopupEvents() {
          popupEvents.forEach((event) => {
            popup.on(event, () => {
              emit(event);
            });
          });
        }
        /**
         * Turn off listener
         *
         * @returns {void}
         */
        function removePopupEvents() {
          popupEvents.forEach((event) => {
            popup.off(event, () => {
              emit(event);
            });
          });
        }

        return {
          content,
        };
      },
    });

  const _hoisted_1$1 = ["id"];

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("section", {
      id: `popup-${Date.now()}`,
      ref: "content"
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 8 /* PROPS */, _hoisted_1$1))
  }

  script$1.render = render$1;
  script$1.__file = "src/popups/VPopup.vue";

  var script = vue.defineComponent({
      name: 'VMarker',
      components: {
        VPopup: script$1,
      },
      props: {
        options: {
          type: Object ,
          default: () => ({} ),
          required: true,
        },
        popupOptions: {
          type: Object ,
          default: () => ({} ),
          required: true,
        },
        coordinates: {
          type: [Object, Array] ,
          default: () => ({}),
          required: true,
        },
        cursor: {
          type: String ,
          default: 'pointer',
          required: false,
        },
      },
      setup(props, { emit }) {
        let map = injectStrict(MapKey);
        let marker = vue.ref({}) ;
        let loaded = vue.ref(true);
        let isMarkerAvailable = vue.ref(false);
        let slotRef = vue.ref(null);

        const setSlotRef = (el) => {
          slotRef.value = el;
        };

        vue.watch(marker, (marker) => {
          if ('_map' in marker) {
            isMarkerAvailable.value = true;
          } else {
            isMarkerAvailable.value = false;
          }
        });

        vue.onMounted(() => {
          if (loaded.value) {
            if (slotRef.value !== null) {
              // add marker to map
              marker.value = new mapboxGl.Marker({
                element: slotRef.value,
                ...props.options,
              });
              setMarkerCoordinates(marker.value);
              addToMap(marker.value);
              setCursorPointer(marker.value);
              listenMarkerEvents(marker.value);
            } else {
              marker.value = new mapboxGl.Marker(props.options);
              setMarkerCoordinates(marker.value);
              addToMap(marker.value);
              setCursorPointer(marker.value);
              listenMarkerEvents(marker.value);
            }
          } else {
            removeFromMap(marker.value);
          }
        });

        vue.onBeforeUnmount(() => {
          removeFromMap(marker.value);
        });

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
         * Set marker coordinates
         *
         * @param {Marker} marker - Marker
         * @returns {void}
         */
        function setMarkerCoordinates(marker) {
          marker.setLngLat(props.coordinates);
        }
        /**
         * Sets the Cursor to Pointer
         *
         * @param {Marker} marker - Marker
         * @returns {void}
         */
        function setCursorPointer(marker) {
          marker.getElement().style.cursor = props.cursor || 'default';
        }

        /**
         * Add marker to map
         *
         * @param {Marker} marker - Marker
         * @returns {void}
         */
        function addToMap(marker) {
          marker.addTo(map.value);
          emit('added', { marker });
        }
        /**
         * Remove marker from map
         *
         * @param {Marker} marker - Marker
         * @returns {void}
         */
        function removeFromMap(marker) {
          if (isMarkerAvailable.value) {
            marker.remove();
            emit('removed');
          }
        }

        /**
         * Listen to events
         *
         * @param {Marker} marker - Marker
         * @returns {void}
         */
        function listenMarkerEvents(marker) {
          let coordinates;
          // Listen to Marker Mapbox events
          markerMapEvents.forEach((event) => {
            marker.on(event, (e) => {
              if (event === 'dragend') {
                if (props.coordinates instanceof Array) {
                  coordinates = [e.target._lngLat.lng, e.target._lngLat.lat];
                } else {
                  coordinates = e.target._lngLat;
                }
                emit('update:coordinates', coordinates);
              }
              emit(event, e);
            });
          });
          // Listen to Marker DOM events
          markerDOMEvents.forEach((event) => {
            marker.getElement().addEventListener(event, (e) => {
              emit(event, e);
            });
          });
        }

        return {
          isMarkerAvailable,
          marker,
          setSlotRef,
        };
      },
    });

  const _hoisted_1 = ["id"];

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_v_popup = vue.resolveComponent("v-popup");

    return (vue.openBlock(), vue.createElementBlock("section", {
      id: `marker-${Date.now()}`,
      class: "absolute"
    }, [
      vue.renderSlot(_ctx.$slots, "markers", { setRef: _ctx.setSlotRef }),
      (_ctx.isMarkerAvailable)
        ? (vue.openBlock(), vue.createBlock(_component_v_popup, {
            key: 0,
            marker: _ctx.marker,
            options: _ctx.popupOptions,
            coordinates: _ctx.coordinates
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["marker", "options", "coordinates"]))
        : vue.createCommentVNode("v-if", true)
    ], 8 /* PROPS */, _hoisted_1))
  }

  script.render = render;
  script.__file = "src/markers/VMarker.vue";

  // Controls

  exports.VControlAttribution = script$f;
  exports.VControlFullscreen = script$e;
  exports.VControlGeolocate = script$d;
  exports.VControlNavigation = script$c;
  exports.VControlScale = script$b;
  exports.VLayerDeckArc = script$a;
  exports.VLayerDeckGeojson = script$9;
  exports.VLayerMapboxCanvas = script$8;
  exports.VLayerMapboxGeojson = script$7;
  exports.VLayerMapboxImage = script$6;
  exports.VLayerMapboxRaster = script$5;
  exports.VLayerMapboxVector = script$4;
  exports.VLayerMapboxVideo = script$3;
  exports.VMap = script$2;
  exports.VMarker = script;
  exports.VPopup = script$1;
  exports["default"] = script$2;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=v-mapbox.js.map
