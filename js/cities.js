//
// ================================================================================
//  spa-lab
//
//  Name:            cities.js
//  Original coding: Vasilis Vlastaras (@gisvlasta), 20/10/2020.
//  Updated:
// ================================================================================


// https://stackoverflow.com/questions/14338683/how-can-i-support-cors-when-using-restify
// https://github.com/Tabcorp/restify-cors-middleware
// https://codepunk.io/using-cors-with-restify-in-nodejs/
// https://www.npmjs.com/package/restify-cors-middleware
// https://www.google.com/search?q=restify+CORS&rlz=1C1GCEU_en&oq=restify+CORS&aqs=chrome..69i57.5679j0j7&sourceid=chrome&ie=UTF-8
// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
// https://stackoverflow.com/questions/35588699/response-to-preflight-request-doesnt-pass-access-control-check


/**
 * The Application Data.
 */
var AppData = AppData || {};

/**
 * Provides functions used globally.
 */
let GlobalFunctions = {

  /**
   * Converts a hex colour to an rgba string.
   *
   * @param hex - The hex colour.
   * @param opacity - The opacity percentage of the rgba colour.
   *
   * @returns {string|*} - The rgba string that can be used to set colours in html.
   */
  hexColourToRgbaString: function(hex, opacity) {

    hex = hex.replace('#', '');

    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';

    return rgba;

  }

};

/**
 * The AppState object holds the application state.
 */
let AppState = {

  /**
   * Indicates whether the bootstrap material tooltip is enabled or not.
   */
  bootstrapMaterialTooltipEnabled: false,

  /**
   * The transparent color is used in those cases that a highly transparent color needs to be rendered.
   */
  transparentColor: { fillColor: '#ffffff', fillOpacity: 0.01 }

};

/**
 * The BaseMapLayers object provides properties and methods related to basemap layers.
 */
let BaseMapLayers = {

  /**
   * All the names of the basemap layers that are defined by the leaflet providers plugin.
   */
  leafletProviderBaseLayers: {
    OpenStreetMap: {
      Mapnik: ['OpenStreetMap.Mapnik', undefined],
      BlackAndWhite: ['OpenStreetMap.BlackAndWhite', undefined],
      DE: ['OpenStreetMap.DE', undefined],
      CH: ['OpenStreetMap.CH', undefined],
      France: ['OpenStreetMap.France', undefined],
      HOT: ['OpenStreetMap.HOT', undefined],
      BZH: ['OpenStreetMap.BZH', undefined]
    },
    OpenTopoMap: ['OpenTopoMap', undefined],
    Thunderforest: {
      OpenCycleMap: ['Thunderforest.OpenCycleMap', { apikey: '' }],
      Transport: ['Thunderforest.Transport', { apikey: '' }],
      TransportDark: ['Thunderforest.TransportDark', { apikey: '' }],
      SpinalMap: ['Thunderforest.SpinalMap', { apikey: '' }],
      Landscape: ['Thunderforest.Landscape', { apikey: '' }],
      Outdoors: ['Thunderforest.Outdoors', { apikey: '' }],
      Pioneer: ['Thunderforest.Pioneer', { apikey: '' }],
    },
    OpenMapSurfer: {
      Roads: ['OpenMapSurfer.Roads', undefined],
      Grayscale: ['OpenMapSurfer.Grayscale', undefined]
    },
    Hydda: {
      Full: ['Hydda.Full', undefined],
      Base: ['Hydda.Base', undefined]
    },
    MapBox: ['MapBox', undefined],
    Stamen: {
      Toner: ['Stamen.Toner', undefined],
      TonerBackground: ['Stamen.TonerBackground', undefined],
      TonerLite: ['Stamen.TonerLite', undefined],
      Watercolor: ['Stamen.Watercolor', undefined],
      Terrain: ['Stamen.Terrain', undefined],
      TerrainBackground: ['Stamen.TerrainBackground', undefined],
      TopOSMRelief: ['Stamen.TopOSMRelief', undefined],
      TonerHybrid: ['Stamen.TonerHybrid', undefined],
      TonerLines: ['Stamen.TonerLines', undefined],
      TonerLabels: ['Stamen.TonerLabels', undefined],
      TopOSMFeatures: ['Stamen.TopOSMFeatures', undefined]
    },
    Esri: {
      WorldStreetMap: ['Esri.WorldStreetMap', undefined],
      DeLome: ['Esri.DeLome', undefined],
      WorldTopoMap: ['Esri.WorldTopoMap', undefined],
      WorldImagery: ['Esri.WorldImagery', undefined],
      WorldTerrain: ['Esri.WorldTerrain', undefined],
      WorldShadedRelief: ['Esri.WorldShadedRelief', undefined],
      WorldPhysical: ['Esri.WorldPhysical', undefined],
      OceanBaseMap: ['Esri.OceanBasemap', undefined],
      NatGeoWorldMap: ['Esri.NatGeoWorldMap', undefined],
      WorldGrayCanvas: ['Esri.WorldGrayCanvas', undefined]
    },
    HERE: {
      normalDay: ['HERE.normalDay', {app_id: '', app_code: ''}],
      basicMap: ['HERE.basicMap', {app_id: '', app_code: ''}],
      hybridDay: ['HERE.hybridDay', {app_id: '', app_code: ''}]
    },
    FreeMapSK: 'FreeMapSK',
    MtbMap: ['MtbMap', undefined],
    CartoDB: {
      Positron: ['CartoDB.Positron', undefined],
      PositronNoLabels: ['CartoDB.PositronNoLabels', undefined],
      PositronOnlyLabels: ['CartoDB.PositronOnlyLabels', undefined],
      DarkMatter: ['CartoDB.DarkMatter', undefined],
      DarkMatterNoLabels: ['CartoDB.DarkMatterNoLabels', undefined],
      DarkMatterOnlyLabels: ['CartoDB.DarkMatterOnlyLabels', undefined]
    },
    HikeBike: {
      HikeBike: ['HikeBike.HikeBike', undefined],
      HillShading: ['HikeBike.HillShading', undefined]
    },
    BasemapAT: {
      basemap: ['BasemapAT.basemap', undefined],
      grau: ['BasemapAT.grau', undefined],
      overlay: ['BasemapAT.overlay', undefined],
      highdpi: ['BasemapAT.highdpi', undefined],
      orthophoto: ['BasemapAT.orthophoto', undefined]
    },
    nlmaps: {
      standaard: ['nlmaps.standaard', undefined],
      pastel: ['nlmaps.pastel', undefined],
      grijs: ['nlmaps.grijs', undefined],
      luchtfoto: ['nlmaps.luchtfoto', undefined]
    },
    NASAGIBS: {
      ModisTerraTrueColorCR: ['NASAGIBS.ModisTerraTrueColorCR', undefined],
      ModisTerraBands367CR: ['NASAGIBS.ModisTerraBands367CR', undefined],
      ViirsEarthAtNight2012: ['NASAGIBS.ViirsEarthAtNight2012', undefined]
    },
    NLS: ['NLS', undefined],
    Wikimedia: ['Wikimedia', undefined]
  },

  /**
   * All the names of the overlay layers that are defined by the leaflet providers plugin.
   */
  leafletProviderOverlayLayers: {
    OpenInfraMap: {
      Power: ['OpenInfraMap.Power', undefined],
      Telecom: ['OpenInfraMap.Telecom', undefined],
      Petroleum: ['OpenInfraMap.Petroleum', undefined],
      Water: ['OpenInfraMap.Water', undefined]
    },
    OpenSeaMap: ['OpenSeaMap', undefined],
    OpenPtMap: ['OpenPtMap', undefined],
    OpenRailwayMap: ['OpenRailwayMap', undefined],
    OpenFireMap: ['OpenFireMap', undefined],
    SafeCast: ['SafeCast', undefined],
    OpenMapSurfer: {
      AdminBounds: ['OpenMapSurfer.AdminBounds', undefined]
    },
    Hydda: {
      RoadsAndLabels: ['Hydda.RoadsAndLabels', undefined]
    },
    Stamen: {
      TonerHybrid: ['Stamen.TonerHybrid', undefined],
      TonerLines: ['Stamen.TonerLines', undefined],
      TonerLabels: ['Stamen.TonerLabels', undefined],
      TopOSMFeatures: ['Stamen.TopOSMFeatures', undefined]
    },
    OpenWeatherMap: {
      Clouds: ['OpenWeatherMap.Clouds', undefined],
      Pressure: ['OpenWeatherMap.Pressure', undefined],
      Wind: ['OpenWeatherMap.Wind', undefined]
    },
    NASAGIBS: {
      ModisTerraLSTDay: ['NASAGIBS.ModisTerraLSTDay', undefined],
      ModisTerraSnowCover: ['NASAGIBS.ModisTerraSnowCover', undefined],
      ModisTerraAOD: ['NASAGIBS.ModisTerraAOD', undefined],
      ModisTerraChlorophyll: ['NASAGIBS.ModisTerraChlorophyll', undefined]
    },
    JusticeMap: {
      income: ['JusticeMap.income', undefined],
      americanIndian: ['JusticeMap.americanIndian', undefined],
      asian: ['JusticeMap.asian', undefined],
      black: ['JusticeMap.black', undefined],
      hispanic: ['JusticeMap.hispanic', undefined],
      multi: ['JusticeMap.multi', undefined],
      nonWhite: ['JusticeMap.nonWhite', undefined],
      white: ['JusticeMap.white', undefined],
      plurality: ['JusticeMap.plurality', undefined]
    }
  },

  /**
   * The named base map layers.
   */
  namedBasemapLayers: {

    /**
     * The basemap layer named Light.
     */
    light: {
      name: 'Light',
      leafletProvider: null,
      mapLayer: null
    },

    /**
     * The basemap layer named Dark.
     */
    dark: {
      name: 'Dark',
      leafletProvider: null,
      mapLayer: null
    },

    /**
     * The basemap layer named Roads.
     */
    roads: {
      name: 'Roads',
      leafletProvider: null,
      mapLayer: null
    },

    /**
     * The basemap layer named Physical.
     */
    physical: {
      name: 'Physical',
      leafletProvider: null,
      mapLayer: null
    },

    /**
     * The basemap layer named Terrain.
     */
    terrain: {
      name: 'Terrain',
      leafletProvider: null,
      mapLayer: null
    },

    /**
     * The basemap layer named Satellite.
     */
    satellite: {
      name: 'Satellite',
      leafletProvider: null,
      mapLayer: null
    }

  },

  /**
   * Sets the the named base map layers.
   */
  setNamedBasemapLayers: function() {

    // Light
    //this.namedBasemapLayers.light.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.OpenStreetMap.BlackAndWhite;
    //this.namedBasemapLayers.light.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.OpenMapSurfer.Grayscale;
    //this.namedBasemapLayers.light.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Stamen.Toner;
    // this.namedBasemapLayers.light.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Stamen.TonerBackground;
    this.namedBasemapLayers.light.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.CartoDB.Positron;
    // this.namedBasemapLayers.light.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.CartoDB.PositronNoLabels;
    // this.namedBasemapLayers.light.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.CartoDB.PositronOnlyLabels;
    // this.namedBasemapLayers.light.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldGrayCanvas;

    // Dark
    this.namedBasemapLayers.dark.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.CartoDB.DarkMatter;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.CartoDB.DarkMatterOnlyLabels;

    // Roads
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.OpenStreetMap.Mapnik
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.OpenStreetMap.HOT;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.OpenMapSurfer.Roads;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Hydda.Full;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Hydda.RoadsAndLabels;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Stamen.TonerLite;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldStreetMap;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldGrayCanvas;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.HikeBike.HikeBike;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Hydda.RoadsAndLabels;
    this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Wikimedia;

    // Physical
    this.namedBasemapLayers.physical.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Hydda.Base;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldPhysical;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldTopoMap;

    // Terrain
    this.namedBasemapLayers.terrain.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Stamen.Terrain;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Stamen.TerrainBackground;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldTerrain;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldShadedRelief;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.HikeBike.HillShading;

    // Satellite
    this.namedBasemapLayers.satellite.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldImagery;

  },

  /**
   * Creates the BaseMap layers.
   */
  createBaseMapLayers: function() {

    // Loop through all the named basemap layers and instantiate them.
    for (let namedLayer in this.namedBasemapLayers) {
      if (this.namedBasemapLayers.hasOwnProperty(namedLayer)) {

        const nameIndex = 0;
        const optionsIndex = 1;

        let baseLayer = this.namedBasemapLayers[namedLayer];

        if (baseLayer.leafletProvider[optionsIndex] === undefined) {
          baseLayer.mapLayer = L.tileLayer.provider(baseLayer.leafletProvider[nameIndex]);
        }
        else {
          baseLayer.mapLayer = L.tileLayer.provider(
            baseLayer.leafletProvider[nameIndex],
            baseLayer.leafletProvider[optionsIndex]
          );
        }

      }
    }

  }

};

/**
 * The MapLayers object provides properties and methods related to map layers.
 */
let MapLayers = {

  /**
   * The Boundary layer.
   */
  boundary: {

    /**
     * The name of the layer.
     */
    name: 'boundary',

    /**
     * The named basemap layers.
     */
    namedBasemapLayers: {

      /**
       * Object light is used to define the styles used to render the
       * Greater Manchester Outline layer on top of the Light Basemap.
       */
      light: {

        /**
         * The default style used to render the GHIA Area of Interest layer on top of the Light Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.red.hex,
          weight: 2,
          opacity: 1
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      },

      /**
       * Object dark is used to define the styles used to render the
       * Greater Manchester Outline layer on top of the Dark Basemap.
       */
      dark: {

        /**
         * The default style used to render the GHIA Area of Interest layer on top of the Dark Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.orange.hex,
          weight: 2,
          opacity: 1
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      },

      /**
       * Object roads is used to define the styles used to render the
       * Greater Manchester Outline layer on top of the Roads Basemap.
       */
      roads: {

        /**
         * The default style used to render the GHIA Area of Interest layer on top of the Roads Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.indigo.hex,
          weight: 2,
          opacity: 1
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      },

      /**
       * Object physical is used to define the styles used to render the
       * Greater Manchester Outline layer on top of the Physical Basemap.
       */
      physical: {

        /**
         * The default style used to render the GHIA Area of Interest layer on top of the Physical Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.deepOrange.hex,
          weight: 2,
          opacity: 1
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      },

      /**
       * Object terrain is used to define the styles used to render the
       * Greater Manchester Outline layer on top of the Terrain Basemap.
       */
      terrain: {

        /**
         * The default style used to render the GHIA Area of Interest layer on top of the Terrain Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.red.hex,
          weight: 2,
          opacity: 1
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      },

      /**
       * Object satellite is used to define the styles used to render the
       * Greater Manchester Outline layer on top of the Satellite Basemap.
       */
      satellite: {

        /**
         * The default style used to render the GHIA Area of Interest layer on top of the Satellite Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.amber.hex,
          weight: 2,
          opacity: 1
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      }

    },

    /**
     * The leaflet map layer.
     */
    mapLayer: null,

    /**
     * The GeoJSON used to create the leaflet map layer.
     */
    geoJSON: null,

    /**
     * Creates the Greater Manchester Outline layer.
     */
    createLayer: function() {

      // Get the named basemap layer.
      let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;

      this.geoJSON = AppData.boundary;

      this.mapLayer = L.geoJSON(this.geoJSON, {

        /**
         * Style the features of the layer using the associated default style defined for this layer.
         * The default style for this layer depends on the selected background map.
         *
         * @param feature - The feature to style.
         * @returns {Style} - A Style capable of styling polygon features.
         */
        style: function(feature) {
          return MapLayers.boundary.namedBasemapLayers[namedBaseMap].defaultStyle;
        }

      });

      // Add the layer in to the map and make sure it is visible.
      this.mapLayer.addTo(Spatial.map);
      this.mapLayer.bringToFront();

    },

    /**
     * Renders the Greater Manchester Outline layer.
     */
    renderLayer: function() {

      // Get the current basemap. This is used to decide the symbology of the Greater Manchester Outline polygons.
      let currentBaseMap = toggleBaseMapViewModel.currentBaseMap;

      // Check whether Greater Manchester Outline features exist or not.
      if (this.geoJSON !== undefined || this.geoJSON !== null) {

        this.mapLayer.eachLayer(function(layer) {
          layer.setStyle(MapLayers.boundary.namedBasemapLayers[currentBaseMap].defaultStyle);
        });

      }

    }

  },

  /**
   * The LAD polygons layer
   */
  lad: {

    /**
     * The name of the layer.
     */
    name: 'lad',

    /**
     * The attribution to add on the map related to the LAD layer.
     */
    // attribution: 'Data source: ' +
    //   '<a href="https://www.ordnancesurvey.co.uk/" target="_cf">Crown Copyright - Ordnance Survey</a>',
    attribution: '', // TODO: Check attribution of LAD

    /**
     * The named basemap layers.
     */
    namedBasemapLayers: {

      /**
       * Object light is used to define the styles used to render
       * the LAD layer on top of the Light Basemap.
       */
      light: {

        /**
         * The default style used to render LAD polygons on top of the Light Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.indigo.hex,
          weight: 1.2,
          opacity: 1,
          fill: false
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      },

      /**
       * Object dark is used to define the styles used to render
       * the LAD layer on top of the Dark Basemap.
       */
      dark: {

        /**
         * The default style used to render LAD polygons on top of the Dark Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.indigo.hex,
          weight: 2,
          opacity: 1,
          fill: false
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      },

      /**
       * Object roads is used to define the styles used to render
       * the LAD layer on top of the Roads Basemap.
       */
      roads: {

        /**
         * The default style used to render LAD polygons on top of the Roads Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.indigo.hex,
          weight: 2,
          opacity: 1,
          fill: false
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      },

      /**
       * Object physical is used to define the styles used to render
       * the LAD layer on top of the Physical Basemap.
       */
      physical: {

        /**
         * The default style used to render LAD polygons on top of the Physical Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.indigo.hex,
          weight: 2,
          opacity: 1,
          fill: false
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      },

      /**
       * Object terrain is used to define the styles used to render
       * the LAD layer on top of the Terrain Basemap.
       */
      terrain: {

        /**
         * The default style used to render LAD polygons on top of the Terrain Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.indigo.hex,
          weight: 2,
          opacity: 1,
          fill: false
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      },

      /**
       * Object satellite is used to define the styles used to render
       * the LAD layer on top of the Satellite Basemap.
       */
      satellite: {

        /**
         * The default style used to render LAD polygons on top of the Satellite Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.indigo.hex,
          weight: 2,
          opacity: 1,
          fill: false
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

      }

    },

    /**
     * The leaflet map layer.
     */
    mapLayer: null,

    /**
     * The GeoJSON used to create the leaflet map layer.
     */
    geoJSON: null,

    /**
     * Creates the LAD layer.
     */
    createLayer: function() {

      // Get the named basemap layer.
      let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;

      if (this.geoJSON === null) {
        this.geoJSON = AppData.lad;
      }

      this.mapLayer = L.geoJSON(this.geoJSON, {

        /**
         * The LAD layer attribution to insert on the map.
         */
        attribution: MapLayers.lad.attribution,

        /**
         * Style the features of the layer using the associated default style defined for this layer.
         * The default style for this layer depends on the selected background map.
         *
         * @param feature - The feature to style.
         * @returns {Style} - A Style capable of styling polygon features.
         */
        style: function(feature) {
          return MapLayers.lad.namedBasemapLayers[namedBaseMap].defaultStyle;
        }

      });

      // Add the layer in to the map and make sure it is visible.
      this.mapLayer.addTo(Spatial.map);
      this.mapLayer.bringToFront();

    },

    /**
     * Renders the LAD layer.
     */
    renderLayer: function() {

      // Get the current basemap. This is used to decide the symbology of the LAD polygons.
      let currentBaseMap = toggleBaseMapViewModel.currentBaseMap;

      // Check whether LAD features exist or not.
      if (this.geoJSON !== undefined || this.geoJSON !== null) {

        this.mapLayer.eachLayer(function(layer) {
          layer.setStyle(MapLayers.lad.namedBasemapLayers[currentBaseMap].defaultStyle);
        });

      }

    },

    /**
     * Adds the lad layer on the map.
     */
    addLayer: function() {

      if (!Spatial.map.hasLayer(this.mapLayer)) {
        Spatial.map.addLayer(this.mapLayer);
        this.mapLayer.bringToFront();
      }

    },

    /**
     * Removes the LAD layer from the map.
     */
    removeLayer: function() {

      if (Spatial.map.hasLayer(this.mapLayer)) {
        Spatial.map.removeLayer(this.mapLayer);
      }

    }

  },

  /**
   * The LSOA polygons layer
   */
  lsoa: {

    /**
     * The name of the layer.
     */
    name: 'lsoa',

    /**
     * The attribution to add on the map related to the LSOA layer.
     */
    // attribution: 'Data source: ' +
    //   '<a href="https://www.ordnancesurvey.co.uk/" target="_cf">Crown Copyright - Ordnance Survey</a>',
    attribution: '', // TODO: Check attribution of LSOA

    fields: {
      id:  {
        name: 'id', description: 'Primary Key'
      },
      c:   {
        name: 'numericCode', description: 'LSOA Numeric Code'
      },
      n:   {
        name: 'name', description: 'Name'
      },
      lcn: {
        name: 'ladNumericCode', description: 'LAD Numeric Code'
      },
      pop: {
        name: 'population', description: 'Population'
      },
      pd:  {
        name: 'populationDensity', description: 'Population Density 2018'
      },
      pp:  {
        name: 'populationPotential', description: 'Population Potential 2018'
      },
      pi:  {
        name: 'periUrbanIndex', description: 'PeriUrban Index 2018'
      },
      bd:  {
        name: 'builtUpDensity', description: 'BuiltUp Density 2018'
      },
      p:   {
        name: 'perimeter', description: 'Perimeter'
      },
      a:   {
        name: 'area', description: 'Area'
      }
    },

    /**
     * The named basemap layers.
     */
    namedBasemapLayers: {

      /**
       * Object light is used to define the styles used to render the LSOA layer on top of the Light Basemap.
       */
      light: {

        /**
         * The default style used to render LSOA polygons on top of the Light Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current LSOA polygon on top of the Light Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: '#4169e1',
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        populationDensity: {

          /**
           * Gets a style based on population density value.
           *
           * @param v - The population density value.
           * @returns - The style used for the specified population density value.
           */
          getStyle: function(v) {

            let c = v >    0 && v <=   10 ? '#38A800' : // rgb( 56, 168, 0)
                    v >   10 && v <=   20 ? '#4CE600' : // rgb( 76, 230, 0)
                    v >   20 && v <=   50 ? '#55FF00' : // rgb( 85, 255, 0)
                    v >   50 && v <=  125 ? '#DFEB00' : // rgb(223, 235, 0)
                    v >  125 && v <=  300 ? '#FFFF00' : // rgb(255, 255, 0)
                    v >  300 && v <=  700 ? '#EAAE00' : // rgb(234, 174, 0)
                    v >  700 && v <= 1500 ? '#FFAA00' : // rgb(255, 170, 0)
                    v > 1500 && v <= 3500 ? '#D47800' : // rgb(212, 120, 0)
                    v > 3500 && v <= 7500 ? '#BF4900' : // rgb(191,  73, 0)
                                            '#A80000';  // rgb(168,   0 ,0)

            return {
              stroke: true,
              color: ColorPalettes.Material.gray700.hex,
              weight: 0.5,
              opacity: 1,
              fill: true,
              fillColor: c,
              fillOpacity: 0.4
              //lineCap: 'round',  // butt | round | square | inherit
              //lineJoin: 'round'  // miter | round | bevel | inherit
            }

          }

        },

        populationPotential: {

        },

        periUrbanIndex: {

        },

        builtUpDensity: {

        }


      },

      /**
       * Object dark is used to define the styles used to render the LSOA layer on top of the Dark Basemap.
       */
      dark: {

        /**
         * The default style used to render LSOA polygons on top of the Dark Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.3,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current LSOA polygon on top of the Dark Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: ColorPalettes.Material.deepOrangeA400.hex,
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        populationDensity: {

          /**
           * Gets a style based on population density value.
           *
           * @param v - The population density value.
           * @returns - The style used for the specified population density value.
           */
          getStyle: function(v) {

            let c = v >    0 && v <=   10 ? '#38A800' : // rgb( 56, 168, 0)
                    v >   10 && v <=   20 ? '#4CE600' : // rgb( 76, 230, 0)
                    v >   20 && v <=   50 ? '#55FF00' : // rgb( 85, 255, 0)
                    v >   50 && v <=  125 ? '#DFEB00' : // rgb(223, 235, 0)
                    v >  125 && v <=  300 ? '#FFFF00' : // rgb(255, 255, 0)
                    v >  300 && v <=  700 ? '#EAAE00' : // rgb(234, 174, 0)
                    v >  700 && v <= 1500 ? '#FFAA00' : // rgb(255, 170, 0)
                    v > 1500 && v <= 3500 ? '#D47800' : // rgb(212, 120, 0)
                    v > 3500 && v <= 7500 ? '#BF4900' : // rgb(191,  73, 0)
                                            '#A80000';  // rgb(168,   0 ,0)

            return {
              stroke: true,
              color: ColorPalettes.Material.gray700.hex,
              weight: 0.5,
              opacity: 1,
              fill: true,
              fillColor: c,
              fillOpacity: 0.4
              //lineCap: 'round',  // butt | round | square | inherit
              //lineJoin: 'round'  // miter | round | bevel | inherit
            }

          }

        },

      },

      /**
       * Object roads is used to define the styles used to render the LSOA layer on top of the Roads Basemap.
       */
      roads: {

        /**
         * The default style used to render LSOA polygons on top of the Roads Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current LSOA polygon on top of the Roads Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: '#2f4f4f',
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        populationDensity: {

          /**
           * Gets a style based on population density value.
           *
           * @param v - The population density value.
           * @returns - The style used for the specified population density value.
           */
          getStyle: function(v) {

            let c = v >    0 && v <=   10 ? '#38A800' : // rgb( 56, 168, 0)
                    v >   10 && v <=   20 ? '#4CE600' : // rgb( 76, 230, 0)
                    v >   20 && v <=   50 ? '#55FF00' : // rgb( 85, 255, 0)
                    v >   50 && v <=  125 ? '#DFEB00' : // rgb(223, 235, 0)
                    v >  125 && v <=  300 ? '#FFFF00' : // rgb(255, 255, 0)
                    v >  300 && v <=  700 ? '#EAAE00' : // rgb(234, 174, 0)
                    v >  700 && v <= 1500 ? '#FFAA00' : // rgb(255, 170, 0)
                    v > 1500 && v <= 3500 ? '#D47800' : // rgb(212, 120, 0)
                    v > 3500 && v <= 7500 ? '#BF4900' : // rgb(191,  73, 0)
                                            '#A80000';  // rgb(168,   0 ,0)

            return {
              stroke: true,
              color: ColorPalettes.Material.gray700.hex,
              weight: 0.5,
              opacity: 1,
              fill: true,
              fillColor: c,
              fillOpacity: 0.4
              //lineCap: 'round',  // butt | round | square | inherit
              //lineJoin: 'round'  // miter | round | bevel | inherit
            }

          }

        },

      },

      /**
       * Object physical is used to define the styles used to render the LSOA layer on top of the Physical Basemap.
       */
      physical: {

        /**
         * The default style used to render LSOA polygons on top of the Physical Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current LSOA polygon on top of the Physical Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: '#4169e1',
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        populationDensity: {

          /**
           * Gets a style based on population density value.
           *
           * @param v - The population density value.
           * @returns - The style used for the specified population density value.
           */
          getStyle: function(v) {

            let c = v >    0 && v <=   10 ? '#38A800' : // rgb( 56, 168, 0)
                    v >   10 && v <=   20 ? '#4CE600' : // rgb( 76, 230, 0)
                    v >   20 && v <=   50 ? '#55FF00' : // rgb( 85, 255, 0)
                    v >   50 && v <=  125 ? '#DFEB00' : // rgb(223, 235, 0)
                    v >  125 && v <=  300 ? '#FFFF00' : // rgb(255, 255, 0)
                    v >  300 && v <=  700 ? '#EAAE00' : // rgb(234, 174, 0)
                    v >  700 && v <= 1500 ? '#FFAA00' : // rgb(255, 170, 0)
                    v > 1500 && v <= 3500 ? '#D47800' : // rgb(212, 120, 0)
                    v > 3500 && v <= 7500 ? '#BF4900' : // rgb(191,  73, 0)
                                            '#A80000';  // rgb(168,   0 ,0)

            return {
              stroke: true,
              color: ColorPalettes.Material.gray700.hex,
              weight: 0.5,
              opacity: 1,
              fill: true,
              fillColor: c,
              fillOpacity: 0.4
              //lineCap: 'round',  // butt | round | square | inherit
              //lineJoin: 'round'  // miter | round | bevel | inherit
            }

          }

        },

      },

      /**
       * Object terrain is used to define the styles used to render the LSOA layer on top of the Terrain Basemap.
       */
      terrain: {

        /**
         * The default style used to render LSOA polygons on top of the Terrain Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current LSOA polygon on top of the Terrain Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: '#4169e1',
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        populationDensity: {

          /**
           * Gets a style based on population density value.
           *
           * @param v - The population density value.
           * @returns - The style used for the specified population density value.
           */
          getStyle: function(v) {

            let c = v >    0 && v <=   10 ? '#38A800' : // rgb( 56, 168, 0)
                    v >   10 && v <=   20 ? '#4CE600' : // rgb( 76, 230, 0)
                    v >   20 && v <=   50 ? '#55FF00' : // rgb( 85, 255, 0)
                    v >   50 && v <=  125 ? '#DFEB00' : // rgb(223, 235, 0)
                    v >  125 && v <=  300 ? '#FFFF00' : // rgb(255, 255, 0)
                    v >  300 && v <=  700 ? '#EAAE00' : // rgb(234, 174, 0)
                    v >  700 && v <= 1500 ? '#FFAA00' : // rgb(255, 170, 0)
                    v > 1500 && v <= 3500 ? '#D47800' : // rgb(212, 120, 0)
                    v > 3500 && v <= 7500 ? '#BF4900' : // rgb(191,  73, 0)
                                            '#A80000';  // rgb(168,   0 ,0)

            return {
              stroke: true,
              color: ColorPalettes.Material.gray700.hex,
              weight: 0.5,
              opacity: 1,
              fill: true,
              fillColor: c,
              fillOpacity: 0.4
              //lineCap: 'round',  // butt | round | square | inherit
              //lineJoin: 'round'  // miter | round | bevel | inherit
            }

          }

        },

      },

      /**
       * Object satellite is used to define the styles used to render the LSOA layer on top of the Satellite Basemap.
       */
      satellite: {

        /**
         * The default style used to render LSOA polygons on top of the Satellite Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current LSOA polygon on top of the Satellite Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: ColorPalettes.Material.deepOrangeA400.hex,
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        populationDensity: {

          /**
           * Gets a style based on population density value.
           *
           * @param v - The population density value.
           * @returns - The style used for the specified population density value.
           */
          getStyle: function(v) {

            let c = v >    0 && v <=   10 ? '#38A800' : // rgb( 56, 168, 0)
                    v >   10 && v <=   20 ? '#4CE600' : // rgb( 76, 230, 0)
                    v >   20 && v <=   50 ? '#55FF00' : // rgb( 85, 255, 0)
                    v >   50 && v <=  125 ? '#DFEB00' : // rgb(223, 235, 0)
                    v >  125 && v <=  300 ? '#FFFF00' : // rgb(255, 255, 0)
                    v >  300 && v <=  700 ? '#EAAE00' : // rgb(234, 174, 0)
                    v >  700 && v <= 1500 ? '#FFAA00' : // rgb(255, 170, 0)
                    v > 1500 && v <= 3500 ? '#D47800' : // rgb(212, 120, 0)
                    v > 3500 && v <= 7500 ? '#BF4900' : // rgb(191,  73, 0)
                                            '#A80000';  // rgb(168,   0 ,0)

            return {
              stroke: true,
              color: ColorPalettes.Material.gray700.hex,
              weight: 0.5,
              opacity: 1,
              fill: true,
              fillColor: c,
              fillOpacity: 0.4
              //lineCap: 'round',  // butt | round | square | inherit
              //lineJoin: 'round'  // miter | round | bevel | inherit
            }

          }

        },

      }

    },

    /**
     * The leaflet map layer.
     */
    mapLayer: null,

    /**
     * The GeoJSON used to create the leaflet map layer.
     */
    geoJSON: null,

    /**
     * The dictionary used to retrieve an internal feature layer based on a feature key.
     * The key used in this case is the LSOA feature code.
     */
    featureToInternalLayerDictionary: {},

    /**
     * The LSOA feature selected by the user.
     */
    selectedFeature: null,

    /**
     * The internal layer of the selected LSOA feature.
     */
    selectedInternalLayer: null,

    /**
     * Creates the LSOA layer.
     */
    createLayer: function() {

      // Get the named basemap layer.
      let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;

      if (this.geoJSON === null) {
        this.geoJSON = AppData.lsoa;
      }

      this.mapLayer = L.geoJSON(this.geoJSON, {

        /**
         * The LSOA layer attribution to insert on the map.
         */
        attribution: MapLayers.lsoa.attribution,

        /**
         * Style the features of the layer using the associated default style defined for this layer.
         * The default style for this layer depends on the selected background map.
         *
         * @param feature - The feature to style.
         * @returns {Style} - A Style capable of styling polygon features.
         */
        style: function(feature) {
          return MapLayers.lsoa.namedBasemapLayers[
            namedBaseMap
          ][MapLayers.lsoa.fields['pd'].name].getStyle(feature.properties.pd);
          //return MapLayers.lsoa.namedBasemapLayers[namedBaseMap].defaultStyle;
        },

        /**
         * Define the behaviour of each feature.
         *
         * @param feature - The feature whose behaviour will be defined.
         * @param layer - The internal layer of each feature.
         */
        onEachFeature: function(feature, layer) {
          layer.on({

            /**
             * Raised when the mouse is over a feature.
             */
            mouseover: function() {
              MapLayers.lsoa.showTooltip(layer);
              MapLayers.lsoa.highlightFeature(feature, layer);
            },

            /**
             * Raised when the mouse is going out of a feature.
             */
            mouseout: function() {
              MapLayers.lsoa.hideTooltip(layer);
              MapLayers.lsoa.resetFeatureStyle(feature, layer);
            },

            /**
             * Raised when a feature is clicked.
             */
            click: function() {
              MapLayers.lsoa.selectFeature(feature);
            }

          });
        }

      });

      // Add the layer in to the map and make sure it is visible.
      this.mapLayer.addTo(Spatial.map);
      this.mapLayer.bringToFront();

      // Loop through all the internal layers and bind a tooltip.
      this.mapLayer.eachLayer(function(layer) {
        layer.bindTooltip('', {
          direction: 'top',
          offset: [0, -10],
          sticky: true
        });
      });

    },

    /**
     * Renders the LSOA layer.
     */
    renderLayer: function() {

      // Get the current basemap. This is used to decide the symbology of the LSOA polygons.
      let currentBaseMap = toggleBaseMapViewModel.currentBaseMap;

      // Check whether LSOA features exist or not.
      if (this.geoJSON !== undefined || this.geoJSON !== null) {

        this.mapLayer.eachLayer(function(layer) {
          layer.setStyle(
            // TODO: CHANGE HARDCODE 'pd'
            MapLayers.lsoa.namedBasemapLayers[
              currentBaseMap
            ][MapLayers.lsoa.fields['pd'].name].getStyle(feature.properties.pd)
          );
        });

      }

    },

    /**
     * Adds the LSOA layer on the map.
     */
    addLayer: function() {

      if (!Spatial.map.hasLayer(this.mapLayer)) {
        Spatial.map.addLayer(this.mapLayer);
        this.mapLayer.bringToFront();
      }

    },

    /**
     * Removes the LSOA layer from the map.
     */
    removeLayer: function() {

      if (Spatial.map.hasLayer(this.mapLayer)) {
        Spatial.map.removeLayer(this.mapLayer);
      }

    },

    /**
     * Highlights a feature.
     *
     * @param feature - The feature that will be highlighted.
     * @param layer - The internal layer of the feature that will be highlighted.
     */
    highlightFeature: function(feature, layer) {

      // Get the named basemap layer.
      let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;

      // Highlight the current LSOA feature.
      layer.setStyle(this.namedBasemapLayers[namedBaseMap].defaultHighlightingStyle);

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }

    },

    /**
     * Resets the feature style. This is called once a mouseout event has been fired.
     *
     * @param feature - The feature that whose style will be reset.
     * @param layer - The internal layer of the feature whose style will be reset.
     */
    resetFeatureStyle: function(feature, layer) {

      // Get the named basemap layer.
      let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;

      // Render the LSOA feature using the default style.
      layer.setStyle(
        // TODO: CHANGE HARDCODE 'pd'
        this.namedBasemapLayers[namedBaseMap][MapLayers.lsoa.fields['pd'].name].getStyle(feature.properties.pd)
      );

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToBack();
      }

    },

    /**
     * Select the specified feature.
     *
     * @param feature - The feature that will be selected.
     * @param layer - The internal layer that will be selected.
     */
    selectFeature: function(feature) {

      let polygon = {
        "type": "Polygon",
        "coordinates": feature.geometry.coordinates[0]
      };

      //   feature.geometry;
      // polygon.type = 'Polygon';

      RestClient.getReportByPolygon(polygon);

    },

    /**
     * Shows an information tooltip over a feature.
     *
     * @param layer - The internal layer whose information will be displayed over using the tooltip.
     */
    showTooltip: function(layer) {

      let properties = layer.feature.properties;

      let html = '<div>' +

        // LSOA Name
        '<div>' +
        '<h6 class="text-danger">' + properties.n + '</h6>' +
        '</div>' +

        '<table>' +
        '<tbody>' +

        // Population
        '<tr>' +
        '<td>Population</td>' +
        '<td class="text-primary">' + properties.pop + '</td>' +
        '</tr>' +

        // Population Density
        '<tr>' +
        '<td>Population Density</td>' +
        '<td class="text-primary">' + properties.pd + '</td>' +
        '</tr>' +

        // Population Potential
        '<tr>' +
        '<td>Population Potential</td>' +
        '<td class="text-primary">' + (properties.pp * 0.01).toFixed(2) + '</td>' +
        '</tr>' +

        // Peri-urban Index
        '<tr>' +
        '<td>Peri-urban Index</td>' +
        '<td class="text-primary">' + (properties.pi * 0.01).toFixed(2) + '</td>' +
        '</tr>' +

        // Built-up Density
        '<tr>' +
        '<td>Built-up Density</td>' +
        '<td class="text-primary">' + (properties.bd * 0.1).toFixed(1) + '</td>' +
        '</tr>' +

        '</tbody>' +
        '</table>' +

        '</div>';

      layer.setTooltipContent(html);

      if (!layer.isTooltipOpen()) {
        layer.openTooltip();
      }

    },

    /**
     * Hides the information tooltip over a feature.
     *
     * @param layer - The internal layer whose tooltip will be hidden.
     */
    hideTooltip: function(layer) {
      if (layer.isTooltipOpen()) {
        layer.closeTooltip();
      }

      layer.setTooltipContent('');
    }

  }

};

/**
 * The Spatial object provides properties and methods related to spatial operations.
 */
let Spatial = {
  // TODO: Update the documentation here.

  /**
   * The member variables of this application.
   */
  Members: {

    /**
     * The web page sidebar name.
     */
    sidebarName: 'sidebar',

    /**
     * The webpage sidebar position.
     */
    sidebarPosition: 'right',

  },

  /**
   * The sidebar of the map.
   */
  sidebar: null,

  /**
   * The map of the application.
   */
  map: null,

  /**
   * The options used to create the map.
   */
  mapOptions: {
    //center: [53.505, -2.14],
    //zoom: 11,
    minZoom: 3,
    maxZoom: 18
  },

  /**
   * Initializes the map.
   */
  initializeMap: function() {

    spinnerViewModel.isVisible = true;

    Spatial.map = L.map('map', {
      // center: Spatial.mapOptions.center,
      // zoom: Spatial.mapOptions.zoom,
      minZoom: Spatial.mapOptions.minZoom,
      maxZoom: Spatial.mapOptions.maxZoom,
      doubleClickZoom: false,
      editable: true
    });

    Spatial.map.fitBounds(
      [[AppData.boundary.bbox[1], AppData.boundary.bbox[0]], [AppData.boundary.bbox[3], AppData.boundary.bbox[2]]],
      { paddingBottomRight: [350, 0] }
    );

    // Move the attribution control to the bottom-left.
    Spatial.map.attributionControl.setPosition('bottomleft');

    // Create the sidebar and add it on the map.
    Spatial.sidebar = L.control.sidebar(
      Spatial.Members.sidebarName, { position: Spatial.Members.sidebarPosition }
    );
    Spatial.sidebar.addTo(Spatial.map);

    BaseMapLayers.setNamedBasemapLayers();
    BaseMapLayers.createBaseMapLayers();

    MapLayers.lsoa.createLayer();
    MapLayers.lad.createLayer();
    MapLayers.boundary.createLayer();

    Spatial.setInitialBaseMapLayer();

    spinnerViewModel.isVisible = false;

  },

  /**
   * Sets the initial basemap layer.
   */
  setInitialBaseMapLayer: function() {

    // Get the current basemap that has been selected by the user.
    let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;
    let baseLayer = BaseMapLayers.namedBasemapLayers[namedBaseMap].mapLayer;

    // Add the basemap layer in to the map.
    baseLayer.addTo(Spatial.map);
    baseLayer.bringToBack();

  }

};

/**
 * Provides methods to get spatial data from GitHub.
 */
let RestClient = {

  /**
   * The base url of the GHIA raster server.
   */
  baseURL: 'https://raw.githubusercontent.com/spa-lab/peri-cene/main/geojson/',

  /**
   * Gets the peri-cene mapping spatial data for the specified city.
   *
   * @param city - The city that is used to get its spatial data.
   */
  getPericenePolygonData: function(city) {

    url = this.baseURL + city + '.geojson';

    axios.get(url)
      .then(function(response) {

        alert(JSON.stringify(response.data));

      }).catch(function(error) {

      // let result =
      //   'ERROR:\r\n'  + '----------------------------------------\r\n' +
      //   'MESSAGE: '     + error.message + '\r\n' +
      //   'STACK: \r\n'   + error.stack + '\r\n\r\n' +
      //   'REQUEST: \r\n' + JSON.stringify(error.request) + '\r\n\r\n' +
      //   'CONFIG: \r\n'  + JSON.stringify(error.config) + '\r\n\r\n' +
      //   'STATUS: '      + error.status + '\r\n' +
      //   'STATUS TEXT: ' + error.statusText + '\r\n\r\n' +
      //   'HEADERS: \r\n' + JSON.stringify(error.headers) + '\r\n\r\n' +
      //   'DATA: \r\n'    + JSON.stringify(error.data) + '\r\n';
      //
      // alert(result);

      let message =
        '<div>' +
        '<p>' +
        '<span>MESSAGE: ' + error.message + '</span><br><br>' +
        '<span>STATUS: ' + error.status + '</span><br>' +
        '<span>STATUS TEXT: ' + error.statusText + '</span><br><br>' +
        '</p>' +
        '<div>';

      popupViewModel.isError = true;
      popupViewModel.title = 'An error has occurred getting results';
      popupViewModel.htmlMessage = message;
      popupViewModel.show();

    }).finally(function() {
      // TODO: Decide about finally.
    });

  },

  /**
   * Gets the raster metadata.
   */
  getMetadata: function() {

    let url = this.baseURL + '/raster-metadata';

    axios.get(url)
      .then(function(response) {

        Raster.metadata = response.data;

      }).catch(function(error) {

        // let result =
        //   'ERROR:\r\n'  + '----------------------------------------\r\n' +
        //   'MESSAGE: '     + error.message + '\r\n' +
        //   'STACK: \r\n'   + error.stack + '\r\n\r\n' +
        //   'REQUEST: \r\n' + JSON.stringify(error.request) + '\r\n\r\n' +
        //   'CONFIG: \r\n'  + JSON.stringify(error.config) + '\r\n\r\n' +
        //   'STATUS: '      + error.status + '\r\n' +
        //   'STATUS TEXT: ' + error.statusText + '\r\n\r\n' +
        //   'HEADERS: \r\n' + JSON.stringify(error.headers) + '\r\n\r\n' +
        //   'DATA: \r\n'    + JSON.stringify(error.data) + '\r\n';
        //
        // alert(result);

        let message =
          '<div>' +
            '<p>' +
              '<span>MESSAGE: ' + error.message + '</span><br><br>' +
              '<span>STATUS: ' + error.status + '</span><br>' +
              '<span>STATUS TEXT: ' + error.statusText + '</span><br><br>' +
            '</p>' +
          '<div>';

        popupViewModel.isError = true;
        popupViewModel.title = 'An error has occurred getting results';
        popupViewModel.htmlMessage = message;
        popupViewModel.show();

      }).finally(function() {
        // TODO: Decide about finally.
      });

  },

  /**
   * Gets the raster cells report using a geographic location.
   * Uses the GET verb.
   *
   * @param lat - The latitude of the geographic location.
   * @param lon - The longitude of the geographic location.
   */
  getReportByPoint: function(lat, lon) {

    let url = this.baseURL + '/report/@' + lat + ',' + lon;

    axios.get(url)
      .then(function(response) {

        let data = response.data;

        Raster.query.type = queryStateViewModel.getCurrentState();
        Raster.query.data = {
          location: data.location,
          rectangle: data.rectangle,
          polygon: undefined
        };

        MapLayers.queriedPolygons.updateLayer(data);
        MapLayers.queriedCentroids.updateLayer(data);

        Raster.setData(data.rasterExtract);

        if (displayResultsViewModel.getCurrentMethod() === 'report') {
          reportViewModel.updateView();
        }
        else {
          diagramViewModel.updateView();
        }

      }).catch(function(error) {

        // let result =
        //   'ERROR:\r\n'  + '----------------------------------------\r\n' +
        //   'MESSAGE: '     + error.message + '\r\n' +
        //   'STACK: \r\n'   + error.stack + '\r\n\r\n' +
        //   'REQUEST: \r\n' + JSON.stringify(error.request) + '\r\n\r\n' +
        //   'CONFIG: \r\n'  + JSON.stringify(error.config) + '\r\n\r\n' +
        //   'STATUS: '      + error.status + '\r\n' +
        //   'STATUS TEXT: ' + error.statusText + '\r\n\r\n' +
        //   'HEADERS: \r\n' + JSON.stringify(error.headers) + '\r\n\r\n' +
        //   'DATA: \r\n'    + JSON.stringify(error.data) + '\r\n';
        //
        // alert(result);

        let message =
          '<div>' +
            '<p>' +
              '<span>MESSAGE: ' + error.message + '</span><br><br>' +
              '<span>STATUS: ' + error.status + '</span><br>' +
              '<span>STATUS TEXT: ' + error.statusText + '</span><br><br>' +
            '</p>' +
          '<div>';

        popupViewModel.isError = true;
        popupViewModel.title = 'An error has occurred getting results';
        popupViewModel.htmlMessage = message;
        popupViewModel.show();

    }).finally(function() {
      // TODO: Decide about finally.
    });

  },

  /**
   * Gets the raster cells report using a geographic polygon.
   * Uses the POST verb.
   *
   * @param polygon - The geographic polygon used to retrieve the raster cells.
   */
  getReportByPolygon: function(polygon) {

    let url = this.baseURL + '/report';

    axios.post(url, {
      polygon: polygon
    }).then(function(response) {

      let data = response.data;

      Raster.query.type = queryStateViewModel.getCurrentState();
      Raster.query.data = {
        location: undefined,
        rectangle: undefined,
        polygon: data.polygon
      };

      MapLayers.queriedPolygons.updateLayer(data);
      MapLayers.queriedCentroids.updateLayer(data);

      Raster.setData(data.rasterExtract);

      if (displayResultsViewModel.getCurrentMethod() === 'report') {
        reportViewModel.updateView();
      }
      else {
        diagramViewModel.updateView();
      }

    }).catch(function(error) {

      // let result =
      //   'ERROR:\r\n'  + '----------------------------------------\r\n' +
      //   'MESSAGE: '     + error.message + '\r\n' +
      //   'STACK: \r\n'   + error.stack + '\r\n\r\n' +
      //   'REQUEST: \r\n' + JSON.stringify(error.request) + '\r\n\r\n' +
      //   'CONFIG: \r\n'  + JSON.stringify(error.config) + '\r\n\r\n' +
      //   'STATUS: '      + error.status + '\r\n' +
      //   'STATUS TEXT: ' + error.statusText + '\r\n\r\n' +
      //   'HEADERS: \r\n' + JSON.stringify(error.headers) + '\r\n\r\n' +
      //   'DATA: \r\n'    + JSON.stringify(error.data) + '\r\n';

      // alert(result);

      let message =
        '<div>' +
          '<p>' +
            '<span>MESSAGE: ' + error.message + '</span><br><br>' +
            '<span>STATUS: ' + error.status + '</span><br>' +
            '<span>STATUS TEXT: ' + error.statusText + '</span><br><br>' +
          '</p>' +
        '<div>';

      popupViewModel.isError = true;
      popupViewModel.title = 'An error has occurred while getting results';
      popupViewModel.htmlMessage = message;
      popupViewModel.show();


    }).finally(function() {

    });

  }

};

// ================================================================================
//  View Models.

/**
 * The spinnerViewModel provides the data and logic to toggle the visibility of spinner.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let spinnerViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#spinnerVM',

  /**
   * The model of the view model.
   */
  data: {

    /**
     * Indicates whether the spinner is visible or not.
     */
    isVisible: false

  }

});

/**
 * The popupViewModel provides the data and logic to show popups on the web page.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let popupViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#popupVM',

  /**
   * The model of the view model.
   */
  data: {

    /**
     * The title of the popup.
     */
    title: '',

    /**
     * The message of the popup in html format.
     */
    htmlMessage: '<p><p>',

    /**
     * Indicates whether the popup displays an error or not.
     */
    isError: false

  },

  /**
   * The methods of the view model.
   */
  methods: {

    /**
     * Shows the popup.
     */
    show() {
      $('#popupVM').modal('show');
    },

    /**
     * Hides the popup.
     */
    hide() {
      $('#popupVM').modal('hide');
    }

  }

});

/**
 * The sidebarTabsViewModel provides the data and logic to toggle the sidebar itself or its contents.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let sidebarTabsViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#sidebarTabsVM',

  /**
   * The model of the view model.
   */
  data: {

  },

  /**
   * The methods of the view model.
   */
  methods: {

    /**
     * Hides the tooltip that is displayed on the specified element.
     * @param element - The element from which the tooltip will be hidden.
     */
    hideTooltip(element) {
      if (AppState.bootstrapMaterialTooltipEnabled) {
        $(element).tooltip('hide');
      }
    }

  }

});

/**
 * The toggleBaseMapViewModel provides the data and logic to toggle the BaseMap layer.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let toggleBaseMapViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#toggleBaseMapButtonsVM',

  /**
   * The model of the view model.
   */
  data: {

    /**
     * The current base map.
     */
    currentBaseMap: 'light',

    /**
     * The dictionary whose keys are the names of basemaps and items are objects providing the
     * names, icon names and descriptions of the buttons.
     * The descriptions can be used in aria-labels or as tooltips.
     */
    dictionary: {
      'light':     { name: 'Light',     description: 'Light Basemap',     iconName: 'map'            },
      'dark':      { name: 'Dark',      description: 'Dark Basemap',      iconName: 'map'            },
      'roads':     { name: 'Roads',     description: 'Roads Basemap',     iconName: 'directions_car' },
      'terrain':   { name: 'Terrain',   description: 'Terrain Basemap',   iconName: 'terrain'        }, /* 'terrain, landscape' */
      'physical':  { name: 'Physical',  description: 'Physical Basemap',  iconName: 'panorama'       }, /* 'image, panorama, photo' */
      'satellite': { name: 'Satellite', description: 'Satellite Basemap', iconName: 'healing'        }  /* 'satellite, cast, healing, photo_camera, local_see' */
    }

  },

  /**
   * The methods of the view model.
   */
  methods: {

    /**
     * Sets the current basemap.
     *
     * @param namedBaseMap - The named basemap.
     */
    setCurrentBaseMap(namedBaseMap) {

      // Remove the current basemap layer.
      Spatial.map.removeLayer(BaseMapLayers.namedBasemapLayers[this.currentBaseMap].mapLayer);

      this.currentBaseMap = namedBaseMap;

      // if (AppState.bootstrapMaterialTooltipEnabled) {
      //   let element = '#' + namedBaseMap + 'Button';
      //   $(element).tooltip('hide');
      // }

      // Add the new current basemap layer.
      let baseLayer = BaseMapLayers.namedBasemapLayers[this.currentBaseMap].mapLayer;

      baseLayer.addTo(Spatial.map);
      baseLayer.bringToBack();

      MapLayers.lad.renderLayer();
      MapLayers.lsoa.renderLayer();
      MapLayers.boundary.renderLayer();

    }

  }

});

/**
 * The renderersViewModel provides the data and logic to toggle the renderer of the map.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let renderersViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: "#renderersVM",

  /**
   * The model of the view model.
   */
  data: {

    /**
     * The renderers of the map.
     */
    renderers: {
      populationDensity: {
        isCurrent: true,
        icon: 'fas fa-map-marked-alt',
        buttonText: 'Population Density',
        tooltip: 'Show the population density on the map',
        field: 'pd'
      },
      populationPotential: {
        isCurrent: false,
        icon: 'fas fa-map-marked-alt',
        buttonText: 'Population Potential',
        tooltip: 'Show the population potential on the map',
        field: 'pp'
      },
      periUrbanIndex: {
        isCurrent: false,
        icon: 'fas fa-map-marked-alt',
        buttonText: 'Peri-urban Index',
        tooltip: 'Show the peri-urban index on the map',
        field: 'pi'
      },
      builtUpDensity: {
        isCurrent: false,
        icon: 'fas fa-map-marked-alt',
        buttonText: 'BuiltUp Density',
        tooltip: 'Show the built up density on the map',
        field: 'bd'
      }
    },

    /**
     * Gets the current renderer.
     *
     * @returns {string} - A string with the current renderer name.
     */
    getCurrentRenderer: function() {

      let currentRenderer = '';

      for (let property in this.renderers) {
        if (this.renderers.hasOwnProperty(property)) {
          if (this.renderers[property].isCurrent) {
            currentRenderer = property;
            break;
          }
        }
      }

      return currentRenderer;

    },

    /**
     * Gets the tooltip associated with the current renderer.
     *
     * @returns {string} - A string with the renderer's tooltip.
     */
    getTooltip: function() {

      let tooltip = '';

      for (let property in this.renderer) {
        if (this.renderers.hasOwnProperty(property)) {
          if (this.renderers[property].isCurrent) {
            tooltip = this.renderers[property].tooltip;
            break;
          }
        }
      }

      return tooltip;

    }

  },

  /**
   * The methods of the view model.
   */
  methods: {

    /**
     * Sets the current renderer.
     *
     * @param renderer - The renderer to become current.
     * Valid values are: {'populationDensity' | 'populationPotential' | 'periUrbanIndex' | 'builtUpDensity'}.
     */
    setCurrentRenderer(renderer) {

      for (let property in this.renderers) {
        if (this.renderers.hasOwnProperty(property)) {
          this.renderers[property].isCurrent = property === renderer;
        }
      }

      if (renderer === 'populationDensity') {
        // if (Spatial.map.editTools.drawing()) {
        //   Spatial.map.editTools.stopDrawing();
        // }
        //
        // Spatial.map.editTools.startMarker();
        //
        // if (MapLayers.lsoa.mapLayer !== null) {
        //   MapLayers.lsoa.removeLayer();
        // }
        // if (MapLayers.wards.mapLayer !== null) {
        //   MapLayers.wards.removeLayer();
        // }
      }
      else if (renderer === 'populationPotential') {
        // if (Spatial.map.editTools.drawing()) {
        //   Spatial.map.editTools.stopDrawing();
        // }
        //
        // Spatial.map.editTools.startPolygon();
        //
        // MapLayers.lsoa.removeLayer();
        // MapLayers.wards.removeLayer();
      }
      else if (renderer === 'periUrbanIndex') {
        // if (Spatial.map.editTools.drawing()) {
        //   Spatial.map.editTools.stopDrawing();
        // }
        //
        // Spatial.map.editTools.startMarker();
        //
        // spinnerViewModel.isVisible = true;
        //
        // MapLayers.wards.removeLayer();
        // MapLayers.lsoa.renderLayer();
        // MapLayers.lsoa.addLayer();
        // MapLayers.queriedPolygons.mapLayer.bringToFront();
        // MapLayers.queriedCentroids.mapLayer.bringToFront();
        // MapLayers.greaterManchesterOutline.mapLayer.bringToFront();

        spinnerViewModel.isVisible = false;
      }
      else if (renderer === 'builtUpDensity') {
        // if (Spatial.map.editTools.drawing()) {
        //   Spatial.map.editTools.stopDrawing();
        // }
        //
        // Spatial.map.editTools.startMarker();
        //
        // spinnerViewModel.isVisible = true;
        //
        // MapLayers.lsoa.removeLayer();
        // MapLayers.wards.renderLayer();
        // MapLayers.wards.addLayer();
        // MapLayers.queriedPolygons.mapLayer.bringToFront();
        // MapLayers.queriedCentroids.mapLayer.bringToFront();
        // MapLayers.greaterManchesterOutline.mapLayer.bringToFront();
        //
        // spinnerViewModel.isVisible = false;
      }

      alert(renderer);

    }

  }

});

/**
 * The citiesViewModel provides the data and logic to allow the user select which city is rendered on the map.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let citiesViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#citiesVM',

  /**
   * The model of the view model.
   */
  data: {

    /**
     * The list of cities that are rendered on the map.
     */
    cities: [
      {
        name:  'Chenai',
        value: 'chennai'
      },
      {
        name:  'Manchester',
        value: 'manchester'
      },
      {
        name:  'City 1',
        value: 'city1'
      },
      {
        name:  'City 2',
        value: 'city2.'
      },
    ],

    /**
     * The selected city.
     */
    selectedCity: 'manchester'

  },

  /**
   * The computed properties of the model of the view model.
   */
  computed: {

  },

  /**
   * The methods of the view model.
   */
  methods: {

    /**
     *  Executes when the selected city has been changed.
     */
    onSelectedCityChanged() {

      let url = 'https://raw.githubusercontent.com/spa-lab/peri-cene/main/geojson/' + this.selectedCity + '.geojson';

      let message = 'Value: ' + this.selectedCity + '\r\n' +
                    'URL:   ' + url;

      alert(message);

    }

  }

});


//
// ================================================================================


// ================================================================================
//  Main Body

// $(document).ready(function(){
//   //AppState.bootstrapMaterialTooltipEnabled = true;
//   $('[data-toggle="tooltip"]').tooltip();
// });

//RestClient.getPericenePolygonData('manchester', true);

Spatial.initializeMap();

Spatial.sidebar.open('map-controls');

//
// ================================================================================
