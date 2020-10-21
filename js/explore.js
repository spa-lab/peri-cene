
// TODO: APPVAR

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

var AppData = AppData || {};

/***
 * The list of comparative Illness and Disability Ratio per stratification class.
 */
AppData.cidrs = {
  '1': { cidr1: [4.650814072, 9.301628144, 13.95244222, 18.60325629, 23.25407036], cidr2: [0, 0, 0, 0, 0] },
  '2': { cidr1: [3.225569044, 6.451138087, 9.676707131, 12.90227617, 16.12784522], cidr2: [-1.193358336, -2.386716672, -3.580075008, -4.773433344, -5.96679168] },
  '3': { cidr1: [4.721955092, 9.443910185, 14.16586528, 18.88782037, 23.60977546], cidr2: [0, 0, 0, 0, 0] },
  '4': { cidr1: [5.217569945, 10.43513989, 15.65270983, 20.87027978, 26.08784972], cidr2: [-3.060723301, -6.121446601, -9.182169902, -12.2428932, -15.3036165] },
  '5': { cidr1: [2.960786329, 5.921572657, 8.882358986, 11.84314531, 14.80393164], cidr2: [0, 0, 0, 0, 0] },
  '6': { cidr1: [0.907805405, 1.815610811, 2.723416216, 3.631221621, 4.539027026], cidr2: [0, 0, 0, 0, 0] },
  '7': { cidr1: [1.809751256, 3.619502512, 5.429253767, 7.239005023, 9.048756279], cidr2: [0, 0, 0, 0, 0] },
  '8': { cidr1: [2.277051317, 4.554102633, 6.831153950, 9.108205267, 11.38525658], cidr2: [0, 0, 0, 0, 0] },
  '9': { cidr1: [1.863333382, 3.726666764, 5.590000146, 7.453333528, 9.316666910], cidr2: [-1.120659266, -2.241318532, -3.361977798, -4.482637064, -5.60329633] }
};

/**
 * The equal interval classification renderer bands.
 * Two classifications are provided, a five band classification and a seven band classification.
 */
AppData.bands = {
  five: [5.217569944, 10.435139888, 15.652709832, 20.870279776, 26.10],
  seven: [3.72683567429, 7.45367134858, 11.1805070229, 14.9073426972, 18.6341783715, 22.3610140457, 26.10]
};

/**
 * The necessary information used to create the equal interval classification renderer
 * based on the improvement and the CIDR.
 */
AppData.improvement = {
  '0': {
    classes: {
      '1': { cidr1: 0, five: { band: 0, fillColor: 'orange100' },     seven: { band: 0, fillColor: 'orange100' } },
      '2': { cidr1: 0, five: { band: 0, fillColor: 'orange100' },     seven: { band: 0, fillColor: 'orange100' } },
      '3': { cidr1: 0, five: { band: 0, fillColor: 'orange100' },     seven: { band: 0, fillColor: 'orange100' } },
      '4': { cidr1: 0, five: { band: 0, fillColor: 'lightGreen100' }, seven: { band: 0, fillColor: 'lightGreen100' } },
      '5': { cidr1: 0, five: { band: 0, fillColor: 'lightGreen100' }, seven: { band: 0, fillColor: 'lightGreen100' } },
      '6': { cidr1: 0, five: { band: 0, fillColor: 'lightGreen100' }, seven: { band: 0, fillColor: 'lightGreen100' } },
      '7': { cidr1: 0, five: { band: 0, fillColor: 'indigo100' },     seven: { band: 0, fillColor: 'indigo100' } },
      '8': { cidr1: 0, five: { band: 0, fillColor: 'indigo100' },     seven: { band: 0, fillColor: 'indigo100' } },
      '9': { cidr1: 0, five: { band: 0, fillColor: 'indigo100' },     seven: { band: 0, fillColor: 'indigo100' } }
    }
  },
  '10': {
    classes: {
      '1': { cidr1: 4.650814072, five: { band: 1, fillColor: 'orange200' },     seven: { band: 2, fillColor: 'orange300' } },
      '2': { cidr1: 3.225569044, five: { band: 1, fillColor: 'orange200' },     seven: { band: 1, fillColor: 'orange200' } },
      '3': { cidr1: 4.721955092, five: { band: 1, fillColor: 'orange200' },     seven: { band: 2, fillColor: 'orange300' } },
      '4': { cidr1: 5.217569945, five: { band: 2, fillColor: 'lightGreen400' }, seven: { band: 2, fillColor: 'lightGreen400' } },
      '5': { cidr1: 2.960786329, five: { band: 1, fillColor: 'lightGreen200' }, seven: { band: 1, fillColor: 'lightGreen300' } },
      '6': { cidr1: 0.907805405, five: { band: 1, fillColor: 'lightGreen200' }, seven: { band: 1, fillColor: 'lightGreen300' } },
      '7': { cidr1: 1.809751256, five: { band: 1, fillColor: 'indigo200' },     seven: { band: 1, fillColor: 'indigo300' } },
      '8': { cidr1: 2.277051317, five: { band: 1, fillColor: 'indigo200' },     seven: { band: 1, fillColor: 'indigo300' } },
      '9': { cidr1: 1.863333382, five: { band: 1, fillColor: 'indigo200' },     seven: { band: 1, fillColor: 'indigo300' } }
    }
  },
  '20': {
    classes: {
      '1': { cidr1: 9.301628144, five: { band: 2, fillColor: 'orange400' },     seven: { band: 3, fillColor: 'orange400' } },
      '2': { cidr1: 6.451138087, five: { band: 2, fillColor: 'orange400' },     seven: { band: 2, fillColor: 'orange300' } },
      '3': { cidr1: 9.443910185, five: { band: 2, fillColor: 'orange400' },     seven: { band: 3, fillColor: 'orange400' } },
      '4': { cidr1: 10.43513989, five: { band: 3, fillColor: 'lightGreen600' }, seven: { band: 3, fillColor: 'lightGreen500' } },
      '5': { cidr1: 5.921572657, five: { band: 2, fillColor: 'lightGreen400' }, seven: { band: 2, fillColor: 'lightGreen400' } },
      '6': { cidr1: 1.815610811, five: { band: 1, fillColor: 'lightGreen200' }, seven: { band: 1, fillColor: 'lightGreen300' } },
      '7': { cidr1: 3.619502512, five: { band: 1, fillColor: 'indigo200' },     seven: { band: 1, fillColor: 'indigo300' } },
      '8': { cidr1: 4.554102633, five: { band: 1, fillColor: 'indigo200' },     seven: { band: 2, fillColor: 'indigo400' } },
      '9': { cidr1: 3.726666764, five: { band: 1, fillColor: 'indigo200' },     seven: { band: 1, fillColor: 'indigo300' } }
    }
  },
  '30': {
    classes: {
      '1': { cidr1: 13.95244222, five: { band: 3, fillColor: 'orange600' },     seven: { band: 4, fillColor: 'orange500' } },
      '2': { cidr1: 9.676707131, five: { band: 2, fillColor: 'orange400' },     seven: { band: 3, fillColor: 'orange400' } },
      '3': { cidr1: 14.16586528, five: { band: 3, fillColor: 'orange600' },     seven: { band: 4, fillColor: 'orange500' } },
      '4': { cidr1: 15.65270983, five: { band: 3, fillColor: 'lightGreen600' }, seven: { band: 5, fillColor: 'lightGreen700' } },
      '5': { cidr1: 8.882358986, five: { band: 2, fillColor: 'lightGreen400' }, seven: { band: 3, fillColor: 'lightGreen500' } },
      '6': { cidr1: 2.723416216, five: { band: 1, fillColor: 'lightGreen200' }, seven: { band: 1, fillColor: 'lightGreen300' } },
      '7': { cidr1: 5.429253767, five: { band: 2, fillColor: 'indigo400' },     seven: { band: 2, fillColor: 'indigo400' } },
      '8': { cidr1: 6.831153950, five: { band: 2, fillColor: 'indigo400' },     seven: { band: 2, fillColor: 'indigo400' } },
      '9': { cidr1: 5.590000146, five: { band: 2, fillColor: 'indigo400' },     seven: { band: 2, fillColor: 'indigo400' } }
    }
  },
  '40': {
    classes: {
      '1': { cidr1: 18.60325629, five: { band: 4, fillColor: 'orange800' },     seven: { band: 5, fillColor: 'orange700' } },
      '2': { cidr1: 12.90227617, five: { band: 3, fillColor: 'orange600' },     seven: { band: 4, fillColor: 'orange500' } },
      '3': { cidr1: 18.88782037, five: { band: 4, fillColor: 'orange800' },     seven: { band: 6, fillColor: 'orange800' } },
      '4': { cidr1: 20.87027978, five: { band: 5, fillColor: 'lightGreen900' }, seven: { band: 6, fillColor: 'lightGreen800' } },
      '5': { cidr1: 11.84314531, five: { band: 3, fillColor: 'lightGreen600' }, seven: { band: 4, fillColor: 'lightGreen600' } },
      '6': { cidr1: 3.631221621, five: { band: 1, fillColor: 'lightGreen200' }, seven: { band: 1, fillColor: 'lightGreen300' } },
      '7': { cidr1: 7.239005023, five: { band: 2, fillColor: 'indigo400' },     seven: { band: 2, fillColor: 'indigo400' } },
      '8': { cidr1: 9.108205267, five: { band: 2, fillColor: 'indigo400' },     seven: { band: 3, fillColor: 'indigo500' } },
      '9': { cidr1: 7.453333528, five: { band: 2, fillColor: 'indigo400' },     seven: { band: 2, fillColor: 'indigo400' } }
    }
  },
  '50': {
    classes: {
      '1': { cidr1: 23.25407036, five: { band: 5, fillColor: 'orange900' },     seven: { band: 7, fillColor: 'orange900' } },
      '2': { cidr1: 16.12784522, five: { band: 4, fillColor: 'orange800' },     seven: { band: 5, fillColor: 'orange700' } },
      '3': { cidr1: 23.60977546, five: { band: 5, fillColor: 'orange900' },     seven: { band: 7, fillColor: 'orange900' } },
      '4': { cidr1: 26.08784972, five: { band: 5, fillColor: 'lightGreen900' }, seven: { band: 7, fillColor: 'lightGreen900' } },
      '5': { cidr1: 14.80393164, five: { band: 3, fillColor: 'lightGreen600' }, seven: { band: 4, fillColor: 'lightGreen600' } },
      '6': { cidr1: 4.539027026, five: { band: 1, fillColor: 'lightGreen200' }, seven: { band: 2, fillColor: 'lightGreen400' } },
      '7': { cidr1: 9.048756279, five: { band: 2, fillColor: 'indigo400' },     seven: { band: 3, fillColor: 'indigo500' } },
      '8': { cidr1: 11.38525658, five: { band: 3, fillColor: 'indigo600' },     seven: { band: 4, fillColor: 'indigo600' } },
      '9': { cidr1: 9.316666910, five: { band: 2, fillColor: 'indigo400' },     seven: { band: 3, fillColor: 'indigo500' } }
    }
  }
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
    // TODO: Check attribution of LSOA
    // attribution: 'Data source: ' +
    //   '<a href="https://www.ordnancesurvey.co.uk/" target="_cf">Crown Copyright - Ordnance Survey</a>',
    attribution: '',

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
          color: '#282828',
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.8
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
          color: '#616161',
          weight: 1,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.8
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current LSOA polygon on top of the Dark Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: '#ff4500',
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        }

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
          color: '#2f4f4f',
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.8
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
        }

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
          color: '#282828',
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.8
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
        }

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
          color: '#282828',
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.8
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
        }

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
          color: '#282828',
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#ffffff',
          fillOpacity: 0.8
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current LSOA polygon on top of the Satellite Basemap.
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
     * The classes metadata in the form of a dictionary whose keys are the values of classes.
     */
    classes: {
      '1': {
        class: 1, visible: true, age: 'Age: Younger', income: 'Income: Low'
      },
      '2': {
        class: 2, visible: true, age: 'Age: Younger', income: 'Income: Medium'
      },
      '3': {
        class: 3, visible: true, age: 'Age: Younger', income: 'Income: High'
      },
      '4': {
        class: 4, visible: true, age: 'Age: Middle', income: 'Income: Low'
      },
      '5': {
        class: 5, visible: true, age: 'Age: Middle', income: 'Income: Medium'
      },
      '6': {
        class: 6, visible: true, age: 'Age: Middle', income: 'Income: High'
      },
      '7': {
        class: 7, visible: true, age: 'Age: Older', income: 'Income: Low'
      },
      '8': {
        class: 8, visible: true, age: 'Age: Older', income: 'Income: Medium'
      },
      '9': {
        class: 9, visible: true, age: 'Age: Older', income: 'Income: High'
      }
    },

    /**
     * Gets the tooltip that is displayed on top of the lsoa layer.
     *
     * @param feature - The feature on which the tooltip will be displayed.
     * @returns {string} - The tooltip string.
     */
    getTooltip: function(feature) {

      let selectedImprovement = mapRendererSetupViewModel.selectedImprovementValue.toString();

      let html = '<h6>' + feature.properties.nm + '</h6>';

      let classValue = feature.properties.class;

      if (classValue !== 0) {
        html += MapLayers.lsoa.classes[classValue].age + ' <br> ' +
                MapLayers.lsoa.classes[classValue].income + '<br><br>' +
                'CIDR: ' + AppData.improvement[selectedImprovement].classes[classValue].cidr1.toFixed(2) + '<br>' +
                'Health Improvement Band: ' + AppData.improvement[selectedImprovement].classes[classValue].seven.band;
      }

      return html;

    },

    /**
     * Creates the LSOA layer.
     */
    createLayer: function() {

      // Get the named basemap layer.
      let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;

      this.geoJSON = AppData.lsoaPolygons;

      this.mapLayer = L.geoJSON(this.geoJSON, {

        /**
         * The LSOA layer attribution to insert on the map.
         */
        attribution: MapLayers.lsoa.attribution,

        /**
         * Style the features of the layer using the
         * @param feature
         * @returns {*}
         */
        style: function(feature) {

          let currentBaseMap = toggleBaseMapViewModel.currentBaseMap;

          let defaultStyle = MapLayers.lsoa.namedBasemapLayers[currentBaseMap].defaultStyle;

          let style = {
            stroke: defaultStyle.stroke,
            color: defaultStyle.color,
            weight: defaultStyle.weight,
            opacity: defaultStyle.opacity,
            fill: defaultStyle.fill,
            fillColor: defaultStyle.fillColor,
            fillOpacity: defaultStyle.fillOpacity
          };

          // TODO: WORKAROUND for the class = 0 bug. (Introduced feature.properties.class !==0 because 2 LSOAs have a class of 0).
          if (feature.properties.class !== 0) {
            let isVisible = MapLayers.lsoa.classes[feature.properties.class.toString()].visible;

            if (isVisible) {

              let selectedImprovement = mapRendererSetupViewModel.selectedImprovementValue;
              let selectedClass = mapRendererSetupViewModel.selectedClassValue;

              // Check if all the stratification classes will be rendered.
              if (selectedClass === 0) {
                // All classes are rendered.
                style.fillColor = ColorPalettes.Material[
                  AppData.improvement[selectedImprovement].classes[feature.properties.class.toString()].seven.fillColor
                ].hex;
              }
              else {
                // Only one class is rendered.
                if (selectedClass === feature.properties.class) {
                  style.fillColor = ColorPalettes.Material[
                    AppData.improvement[selectedImprovement].classes[selectedClass.toString()].seven.fillColor
                  ].hex;
                }
                else {
                  // All other classes are rendered with the default style and no fill color.
                  style.fillOpacity = 0.01;
                }
              }

            }
            else {
              style.fillOpacity = 0.01;
            }
          }
          else {
            style.fillOpacity = 0.01;
          }

          return style;

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
              //MapLayers.lsoa.showTooltip(layer);
              MapLayers.lsoa.highlightFeature(feature, layer);
            },

            /**
             * Raised when the mouse is going out of a feature.
             */
            mouseout: function() {
              //MapLayers.lsoa.hideTooltip(layer);
              MapLayers.lsoa.resetFeatureStyle(feature, layer);
            }

          });
        }

      });

      // Add the layer in to the map and make sure it is visible.
      this.mapLayer.addTo(Spatial.map);
      this.mapLayer.bringToFront();

      // Loop through all the internal layers.
      // Create the feature to internal layer dictionary and bind the layer tooltips.
      this.mapLayer.eachLayer(function(layer) {
        layer.bindTooltip(MapLayers.lsoa.getTooltip(layer.feature), {
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

          let feature = layer.feature;

          let defaultStyle = MapLayers.lsoa.namedBasemapLayers[currentBaseMap].defaultStyle;

          let style = {
            stroke: defaultStyle.stroke,
            color: defaultStyle.color,
            weight: defaultStyle.weight,
            opacity: defaultStyle.opacity,
            fill: defaultStyle.fill,
            fillColor: defaultStyle.fillColor,
            fillOpacity: defaultStyle.fillOpacity
          };

          // TODO: WORKAROUND for the class = 0 bug. (Introduced feature.properties.class !==0 because 2 LSOAs have a class of 0).
          if (feature.properties.class !== 0) {
            let isVisible = MapLayers.lsoa.classes[feature.properties.class.toString()].visible;

            if (isVisible) {

              let selectedImprovement = mapRendererSetupViewModel.selectedImprovementValue;
              let selectedClass = mapRendererSetupViewModel.selectedClassValue;

              // Check if all the stratification classes will be rendered.
              if (selectedClass === 0) {
                // All classes are rendered.
                style.fillColor = ColorPalettes.Material[
                  AppData.improvement[selectedImprovement].classes[feature.properties.class.toString()].five.fillColor
                ].hex;
              }
              else {
                // Only one class is rendered.
                if (selectedClass === feature.properties.class) {
                  style.fillColor = ColorPalettes.Material[
                    AppData.improvement[selectedImprovement].classes[selectedClass.toString()].five.fillColor
                  ].hex;
                }
                else {
                  // All other classes are rendered with the default style and no fill color.
                  style.fillOpacity = 0.01;
                }
              }

            }
            else {
              style.fillOpacity = 0.01;
            }
          }
          else {
            style.fillOpacity = 0.01;
          }

          layer.setStyle(style);

          layer.setTooltipContent(MapLayers.lsoa.getTooltip(feature));

        });

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

      let defaultStyle = MapLayers.lsoa.namedBasemapLayers[namedBaseMap].defaultStyle;

      let style = {
        stroke: defaultStyle.stroke,
        color: defaultStyle.color,
        weight: defaultStyle.weight,
        opacity: defaultStyle.opacity,
        fill: defaultStyle.fill,
        fillColor: defaultStyle.fillColor,
        fillOpacity: defaultStyle.fillOpacity
      };

      // TODO: WORKAROUND for the class = 0 bug. (Introduced feature.properties.class !==0 because 2 LSOAs have a class of 0).
      if (feature.properties.class !== 0) {
        let isVisible = MapLayers.lsoa.classes[feature.properties.class.toString()].visible;

        if (isVisible) {

          let selectedImprovement = mapRendererSetupViewModel.selectedImprovementValue;
          let selectedClass = mapRendererSetupViewModel.selectedClassValue;

          // Check if all the stratification classes will be rendered.
          if (selectedClass === 0) {
            // All classes are rendered.
            style.fillColor = ColorPalettes.Material[
              AppData.improvement[selectedImprovement].classes[feature.properties.class.toString()].five.fillColor
              ].hex;
          }
          else {
            // Only one class is rendered.
            if (selectedClass === feature.properties.class) {
              style.fillColor = ColorPalettes.Material[
                AppData.improvement[selectedImprovement].classes[selectedClass.toString()].five.fillColor
                ].hex;
            }
            else {
              // All other classes are rendered with the default style and no fill color.
              style.fillOpacity = 0.01;
            }
          }

        }
        else {
          style.fillOpacity = 0.01;
        }
      }
      else {
        style.fillOpacity = 0.01;
      }

      layer.setStyle(style);

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToBack();
      }

    }

  }

};

/**
 * The Spatial object provides properties and methods related to spatial operations.
 */
let Spatial = {

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
    center: [53.505, -2.14],
    zoom: 11,
    minZoom: 3,
    maxZoom: 18
  },

  /**
   * Initializes the map.
   */
  initializeMap: function() {

    spinnerViewModel.isVisible = true;

    Spatial.map = L.map('map', {
      center: Spatial.mapOptions.center,
      zoom: Spatial.mapOptions.zoom,
      minZoom: Spatial.mapOptions.minZoom,
      maxZoom: Spatial.mapOptions.maxZoom,
      doubleClickZoom: false
    });

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
 * The sidebarTabsViewModel provides tha data and logic to toggle the sidebar itself or its contents.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
// let sidebarTabsViewModel = new Vue({
//
//   /**
//    * The name of the view model.
//    */
//   el: '#sidebarTabsVM',
//
//   /**
//    * The model of the view model.
//    */
//   data: {
//
//   },
//
//   /**
//    * The methods of the view model.
//    */
//   methods: {
//
//     /**
//      * Hides the tooltip that is displayed on the specified element.
//      * @param element - The element from which the tooltip will be hidden.
//      */
//     hideTooltip(element) {
//       if (AppState.bootstrapMaterialTooltipEnabled) {
//         $(element).tooltip('hide');
//       }
//     }
//
//   }
//
// });

/**
 * The toggleBaseMapViewModel provides tha data and logic to toggle the BaseMap layer.
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
    currentBaseMap: 'physical',

    /**
     * The dictionary whose keys are the names of basemaps and items are objects providing the
     * names, icon names and descriptions of the buttons.
     * The descriptions can be used in aria-labels or as tooltips.
     */
    dictionary: {
      'physical':  { name: 'Physical',  description: 'Physical Basemap',  iconName: 'panorama'       }, /* 'image, panorama, photo' */
      'satellite': { name: 'Satellite', description: 'Satellite Basemap', iconName: 'healing'        }, /* 'satellite, cast, healing, photo_camera, local_see' */
      'light':     { name: 'Light',     description: 'Light Basemap',     iconName: 'map'            },
      'dark':      { name: 'Dark',      description: 'Dark Basemap',      iconName: 'map'            },
      'roads':     { name: 'Roads',     description: 'Roads Basemap',     iconName: 'directions_car' },
      'terrain':   { name: 'Terrain',   description: 'Terrain Basemap',   iconName: 'terrain'        }  /* 'terrain, landscape' */
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

      MapLayers.lsoa.renderLayer();

    }

  }

});

/**
 * The mapRendererSetupViewModel provides the data and logic to select how the map will be rendered based on the
 * income and age stratification and the percentage of health improvement.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let mapRendererSetupViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#mapRendererSetupVM',

  /**
   * The model of the view model.
   */
  data: {

    /**
     * The list of classes of the stratification of Greater Manchester.
     */
    stratification: [
      {
        value: 0,
        name: 'All classes'
      },
      {
        value: 1,
        name: 'Younger - Low Income'
      },
      {
        value: 2,
        name: 'Younger - Medium Icome'
      },
      {
        value: 3,
        name: 'Younger - High Income'
      },
      {
        value: 4,
        name: 'Middle - Low Income'
      },
      {
        value: 5,
        name: 'Middle - Medium Income'
      },
      {
        value: 6,
        name: 'Middle - High Income'
      },
      {
        value: 7,
        name: 'Older - Low Income'
      },
      {
        value: 8,
        name: 'Older - Medium Income'
      },
      {
        value: 9,
        name: 'Older - High Income'
      }
    ],

    /**
     * The selected stratification class.
     */
    selectedClassValue: 0,

    /**
     * The selected improvement value.
     */
    selectedImprovementValue: 0

  },

  /**
   * The computed properties of the model of the view model.
   */
  computed: {

    /**
     * Gets the selected stratification class.
     *
     * @returns {T} - The selected stratification class object.
     */
    selectedStratificationClass: function() {
      return this.stratification.find(c => c.value === this.selectedClassValue);
    },

    /**
     * Gets the selected improvement text.
     *
     * @returns {string} - The text to show.
     */
    selectedImprovementText: function() {
      return this.selectedImprovementValue.toString() + "%";
    }

  },

  /**
   * The methods of the view model.
   */
  methods: {

    /**
     * Updates the map using the relevant renderer.
     */
    updateMap() {
      MapLayers.lsoa.renderLayer();
    }

  }

});



//
// ================================================================================


// ================================================================================
//  Main Body

// $(document).ready(function(){
//   AppState.bootstrapMaterialTooltipEnabled = true;
//   $('[data-toggle="tooltip"]').tooltip();
// });

Spatial.initializeMap();

Spatial.sidebar.open('map-controls');

//
// ================================================================================
