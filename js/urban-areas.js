//
// ================================================================================
//  spa-lab
//
//  Name:            urban-areas.js
//  Original coding: Vasilis Vlastaras (@gisvlasta), 20/10/2020.
//  Updated:
// ================================================================================

// /**
//  * The Application Data.
//  */
// var AppData = AppData || {};

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
  transparentColor: { fillColor: '#ffffff', fillOpacity: 0.01 },

  /**
   * The current urban area.
   */
  currentUrbanArea: 'manchester'

};

let Renderers = {

  /**
   * The renderer related to population density.
   */
  populationDensity: {

    entries: 10,

    texts: {
      0: { index: 1,  text: '[0, 10]'      },
      1: { index: 2,  text: '(10, 20]'     },
      2: { index: 3,  text: '(20, 50]'     },
      3: { index: 4,  text: '(50, 125]'    },
      4: { index: 5,  text: '(125, 300]'   },
      5: { index: 6,  text: '(300, 700]'   },
      6: { index: 7,  text: '(700, 1500]'  },
      7: { index: 8,  text: '(1500, 3500]' },
      8: { index: 9,  text: '(3500, 7500]' },
      9: { index: 10, text: '> 7500'       },
    },

    baseMaps: {
      light: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#38a800', // rgb( 56, 168, 0)
          1: '#4ce600', // rgb( 76, 230, 0)
          2: '#55ff00', // rgb( 85, 255, 0)
          3: '#dfeb00', // rgb(223, 235, 0)
          4: '#ffff00', // rgb(255, 255, 0)
          5: '#eaae00', // rgb(234, 174, 0)
          6: '#ffaa00', // rgb(255, 170, 0)
          7: '#d47800', // rgb(212, 120, 0)
          8: '#bf4900', // rgb(191,  73, 0)
          9: '#a80000', // rgb(168,   0 ,0)
        }
      },
      dark: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#38a800', // rgb( 56, 168, 0)
          1: '#4ce600', // rgb( 76, 230, 0)
          2: '#55ff00', // rgb( 85, 255, 0)
          3: '#dfeb00', // rgb(223, 235, 0)
          4: '#ffff00', // rgb(255, 255, 0)
          5: '#eaae00', // rgb(234, 174, 0)
          6: '#ffaa00', // rgb(255, 170, 0)
          7: '#d47800', // rgb(212, 120, 0)
          8: '#bf4900', // rgb(191,  73, 0)
          9: '#a80000', // rgb(168,   0 ,0)
        }
      },
      roads: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#38a800', // rgb( 56, 168, 0)
          1: '#4ce600', // rgb( 76, 230, 0)
          2: '#55ff00', // rgb( 85, 255, 0)
          3: '#dfeb00', // rgb(223, 235, 0)
          4: '#ffff00', // rgb(255, 255, 0)
          5: '#eaae00', // rgb(234, 174, 0)
          6: '#ffaa00', // rgb(255, 170, 0)
          7: '#d47800', // rgb(212, 120, 0)
          8: '#bf4900', // rgb(191,  73, 0)
          9: '#a80000', // rgb(168,   0 ,0)
        }
      },
      physical: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#38a800', // rgb( 56, 168, 0)
          1: '#4ce600', // rgb( 76, 230, 0)
          2: '#55ff00', // rgb( 85, 255, 0)
          3: '#dfeb00', // rgb(223, 235, 0)
          4: '#ffff00', // rgb(255, 255, 0)
          5: '#eaae00', // rgb(234, 174, 0)
          6: '#ffaa00', // rgb(255, 170, 0)
          7: '#d47800', // rgb(212, 120, 0)
          8: '#bf4900', // rgb(191,  73, 0)
          9: '#a80000', // rgb(168,   0 ,0)
        }
      },
      terrain: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#38a800', // rgb( 56, 168, 0)
          1: '#4ce600', // rgb( 76, 230, 0)
          2: '#55ff00', // rgb( 85, 255, 0)
          3: '#dfeb00', // rgb(223, 235, 0)
          4: '#ffff00', // rgb(255, 255, 0)
          5: '#eaae00', // rgb(234, 174, 0)
          6: '#ffaa00', // rgb(255, 170, 0)
          7: '#d47800', // rgb(212, 120, 0)
          8: '#bf4900', // rgb(191,  73, 0)
          9: '#a80000', // rgb(168,   0 ,0)
        }
      },
      satellite: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#38a800', // rgb( 56, 168, 0)
          1: '#4ce600', // rgb( 76, 230, 0)
          2: '#55ff00', // rgb( 85, 255, 0)
          3: '#dfeb00', // rgb(223, 235, 0)
          4: '#ffff00', // rgb(255, 255, 0)
          5: '#eaae00', // rgb(234, 174, 0)
          6: '#ffaa00', // rgb(255, 170, 0)
          7: '#d47800', // rgb(212, 120, 0)
          8: '#bf4900', // rgb(191,  73, 0)
          9: '#a80000', // rgb(168,   0 ,0)
        }
      }
    },

    /**
     * Gets the index of the value.
     *
     * @param v - The value whose index will be retrieved.
     * @returns {number} - The index of the renderer entry.
     */
    getIndex: function(v) {

      return v >=    0 && v <=   10 ? 0 :
             v >    10 && v <=   20 ? 1 :
             v >    20 && v <=   50 ? 2 :
             v >    50 && v <=  125 ? 3 :
             v >   125 && v <=  300 ? 4 :
             v >   300 && v <=  700 ? 5 :
             v >   700 && v <= 1500 ? 6 :
             v >  1500 && v <= 3500 ? 7 :
             v >  3500 && v <= 7500 ? 8 :
                                     9;

    },

    /**
     * Gets a style based on population density value.
     *
     * @param v - The population density value.
     * @param basemap - The basemap whose associated style will be retrieved.
     * @returns - The style used for the specified population density value.
     */
    getFillColor: function(v, basemap) {

      let index = Renderers.populationDensity.getIndex(v);

      return Renderers.populationDensity.baseMaps[basemap].fillColors[index.toString()];

    },

    /**
     * Gets a style based on population density value.
     *
     * @param v - The population density value.
     * @param basemap - The basemap whose associated style will be retrieved.
     * @returns - The style used for the specified population density value.
     */
    getStyle: function(v, basemap) {

      let index = Renderers.populationDensity.getIndex(v);

      let baseStyle = Renderers.populationDensity.baseMaps[basemap].baseStyle;
      let fillColor = Renderers.populationDensity.baseMaps[basemap].fillColors[index.toString()];

      return {
        stroke: baseStyle.stroke,
        color: baseStyle.color,
        weight: baseStyle.weight,
        opacity: baseStyle.opacity,
        fill: baseStyle.fill,
        fillColor: fillColor,
        fillOpacity: baseStyle.fillOpacity
        //lineCap: 'round',  // butt | round | square | inherit
        //lineJoin: 'round'  // miter | round | bevel | inherit
      }

    }

  },

  /**
   * The renderer related to population potential.
   */
  populationPotential: {

    entries: 10,

    texts: {
      0: { index: 1,  text: '[0.00, 0.10]' },
      1: { index: 2,  text: '(0.10, 0.20]' },
      2: { index: 3,  text: '(0.20, 0.30]' },
      3: { index: 4,  text: '(0.30, 0.40]' },
      4: { index: 5,  text: '(0.40, 0.50]' },
      5: { index: 6,  text: '(0.50, 0.60]' },
      6: { index: 7,  text: '(0.60, 0.70]' },
      7: { index: 8,  text: '(0.70, 0.80]' },
      8: { index: 9,  text: '(0.80, 0.90]' },
      9: { index: 10, text: '(0.90, 1.00]' },
    },

    baseMaps: {
      light: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#bfe9ff', // rgb(191, 233, 255)
          1: '#bacde8', // rgb(186, 205, 232)
          2: '#b2b4d1', // rgb(178, 180, 209)
          3: '#ab97ba', // rgb(171, 151, 186)
          4: '#a47ea6', // rgb(164, 126, 166)
          5: '#9c6792', // rgb(156, 103, 146)
          6: '#91507f', // rgb(145,  80, 127)
          7: '#87396c', // rgb(135,  57, 108)
          8: '#7d235c', // rgb(125,  35,  92)
          9: '#73004d', // rgb(115,   0,  77)
        }
      },
      dark: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#bfe9ff', // rgb(191, 233, 255)
          1: '#bacde8', // rgb(186, 205, 232)
          2: '#b2b4d1', // rgb(178, 180, 209)
          3: '#ab97ba', // rgb(171, 151, 186)
          4: '#a47ea6', // rgb(164, 126, 166)
          5: '#9c6792', // rgb(156, 103, 146)
          6: '#91507f', // rgb(145,  80, 127)
          7: '#87396c', // rgb(135,  57, 108)
          8: '#7d235c', // rgb(125,  35,  92)
          9: '#73004d', // rgb(115,   0,  77)
        }
      },
      roads: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#bfe9ff', // rgb(191, 233, 255)
          1: '#bacde8', // rgb(186, 205, 232)
          2: '#b2b4d1', // rgb(178, 180, 209)
          3: '#ab97ba', // rgb(171, 151, 186)
          4: '#a47ea6', // rgb(164, 126, 166)
          5: '#9c6792', // rgb(156, 103, 146)
          6: '#91507f', // rgb(145,  80, 127)
          7: '#87396c', // rgb(135,  57, 108)
          8: '#7d235c', // rgb(125,  35,  92)
          9: '#73004d', // rgb(115,   0,  77)
        }
      },
      physical: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.6
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#bfe9ff', // rgb(191, 233, 255)
          1: '#bacde8', // rgb(186, 205, 232)
          2: '#b2b4d1', // rgb(178, 180, 209)
          3: '#ab97ba', // rgb(171, 151, 186)
          4: '#a47ea6', // rgb(164, 126, 166)
          5: '#9c6792', // rgb(156, 103, 146)
          6: '#91507f', // rgb(145,  80, 127)
          7: '#87396c', // rgb(135,  57, 108)
          8: '#7d235c', // rgb(125,  35,  92)
          9: '#73004d', // rgb(115,   0,  77)
        }
      },
      terrain: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#bfe9ff', // rgb(191, 233, 255)
          1: '#bacde8', // rgb(186, 205, 232)
          2: '#b2b4d1', // rgb(178, 180, 209)
          3: '#ab97ba', // rgb(171, 151, 186)
          4: '#a47ea6', // rgb(164, 126, 166)
          5: '#9c6792', // rgb(156, 103, 146)
          6: '#91507f', // rgb(145,  80, 127)
          7: '#87396c', // rgb(135,  57, 108)
          8: '#7d235c', // rgb(125,  35,  92)
          9: '#73004d', // rgb(115,   0,  77)
        }
      },
      satellite: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#bfe9ff', // rgb(191, 233, 255)
          1: '#bacde8', // rgb(186, 205, 232)
          2: '#b2b4d1', // rgb(178, 180, 209)
          3: '#ab97ba', // rgb(171, 151, 186)
          4: '#a47ea6', // rgb(164, 126, 166)
          5: '#9c6792', // rgb(156, 103, 146)
          6: '#91507f', // rgb(145,  80, 127)
          7: '#87396c', // rgb(135,  57, 108)
          8: '#7d235c', // rgb(125,  35,  92)
          9: '#73004d', // rgb(115,   0,  77)
        }
      }
    },

    /**
     * Gets the index of the value.
     *
     * @param v - The value whose index will be retrieved.
     * @returns {number} - The index of the renderer entry.
     */
    getIndex: function(v) {

      return v >=  0 && v <= 10 ? 0 :
             v >  10 && v <= 20 ? 1 :
             v >  20 && v <= 30 ? 2 :
             v >  30 && v <= 40 ? 3 :
             v >  40 && v <= 50 ? 4 :
             v >  50 && v <= 60 ? 5 :
             v >  60 && v <= 70 ? 6 :
             v >  70 && v <= 80 ? 7 :
             v >  80 && v <= 90 ? 8 :
                                  9;

    },

    /**
     * Gets a style based on population density value.
     *
     * @param v - The population density value.
     * @param basemap - The basemap whose associated style will be retrieved.
     * @returns - The style used for the specified population density value.
     */
    getFillColor: function(v, basemap) {

      let index = Renderers.populationPotential.getIndex(v);

      return Renderers.populationPotential.baseMaps[basemap].fillColors[index.toString()];

    },

    /**
     * Gets a style based on population density value.
     *
     * @param v - The population density value.
     * @param basemap - The basemap whose associated style will be retrieved.
     * @returns - The style used for the specified population density value.
     */
    getStyle: function(v, basemap) {

      let index = Renderers.populationPotential.getIndex(v);

      let baseStyle = Renderers.populationPotential.baseMaps[basemap].baseStyle;
      let fillColor = Renderers.populationPotential.baseMaps[basemap].fillColors[index.toString()];

      return {
        stroke: baseStyle.stroke,
        color: baseStyle.color,
        weight: baseStyle.weight,
        opacity: baseStyle.opacity,
        fill: baseStyle.fill,
        fillColor: fillColor,
        fillOpacity: baseStyle.fillOpacity
        //lineCap: 'round',  // butt | round | square | inherit
        //lineJoin: 'round'  // miter | round | bevel | inherit
      }

    }

  },

  /**
   * The renderer related to peri-urban index.
   */
  periUrbanIndex: {

    entries: 5,

    texts: {
      0: { index: 1,  text: '[0.00, 0.21]' },
      1: { index: 2,  text: '(0.21, 0.34]' },
      2: { index: 3,  text: '(0.34, 0.44]' },
      3: { index: 4,  text: '(0.44, 0.55]' },
      4: { index: 5,  text: '(0.55, 1.00]' }
    },

    baseMaps: {
      light: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#9ca800', // rgb(156, 168,   0)
          1: '#8bd100', // rgb(139, 209,   0)
          2: '#ffff00', // rgb(255, 255,   0)
          3: '#ff8000', // rgb(255, 128,   0)
          4: '#ff0000', // rgb(255,   0,   0)
        }
      },
      dark: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#9ca800', // rgb(156, 168,   0)
          1: '#8bd100', // rgb(139, 209,   0)
          2: '#ffff00', // rgb(255, 255,   0)
          3: '#ff8000', // rgb(255, 128,   0)
          4: '#ff0000', // rgb(255,   0,   0)
        }
      },
      roads: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#9ca800', // rgb(156, 168,   0)
          1: '#8bd100', // rgb(139, 209,   0)
          2: '#ffff00', // rgb(255, 255,   0)
          3: '#ff8000', // rgb(255, 128,   0)
          4: '#ff0000', // rgb(255,   0,   0)
        }
      },
      physical: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.6
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#9ca800', // rgb(156, 168,   0)
          1: '#8bd100', // rgb(139, 209,   0)
          2: '#ffff00', // rgb(255, 255,   0)
          3: '#ff8000', // rgb(255, 128,   0)
          4: '#ff0000', // rgb(255,   0,   0)
        }
      },
      terrain: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#9ca800', // rgb(156, 168,   0)
          1: '#8bd100', // rgb(139, 209,   0)
          2: '#ffff00', // rgb(255, 255,   0)
          3: '#ff8000', // rgb(255, 128,   0)
          4: '#ff0000', // rgb(255,   0,   0)
        }
      },
      satellite: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#9ca800', // rgb(156, 168,   0)
          1: '#8bd100', // rgb(139, 209,   0)
          2: '#ffff00', // rgb(255, 255,   0)
          3: '#ff8000', // rgb(255, 128,   0)
          4: '#ff0000', // rgb(255,   0,   0)
        }
      }
    },

    /**
     * Gets the index of the value.
     *
     * @param v - The value whose index will be retrieved.
     * @returns {number} - The index of the renderer entry.
     */
    getIndex: function(v) {

      return v >=  0 && v <= 21 ? 0 :
             v >  21 && v <= 34 ? 1 :
             v >  34 && v <= 44 ? 2 :
             v >  44 && v <= 54 ? 3 :
                                  4;

    },

    /**
     * Gets a style based on population density value.
     *
     * @param v - The population density value.
     * @param basemap - The basemap whose associated style will be retrieved.
     * @returns - The style used for the specified population density value.
     */
    getFillColor: function(v, basemap) {

      let index = Renderers.periUrbanIndex.getIndex(v);

      return Renderers.periUrbanIndex.baseMaps[basemap].fillColors[index.toString()];

    },

    /**
     * Gets a style based on population density value.
     *
     * @param v - The population density value.
     * @param basemap - The basemap whose associated style will be retrieved.
     * @returns - The style used for the specified population density value.
     */
    getStyle: function(v, basemap) {

      let index = Renderers.periUrbanIndex.getIndex(v);

      let baseStyle = Renderers.periUrbanIndex.baseMaps[basemap].baseStyle;
      let fillColor = Renderers.periUrbanIndex.baseMaps[basemap].fillColors[index.toString()];

      return {
        stroke: baseStyle.stroke,
        color: baseStyle.color,
        weight: baseStyle.weight,
        opacity: baseStyle.opacity,
        fill: baseStyle.fill,
        fillColor: fillColor,
        fillOpacity: baseStyle.fillOpacity
        //lineCap: 'round',  // butt | round | square | inherit
        //lineJoin: 'round'  // miter | round | bevel | inherit
      }

    }

  },

  /**
   * The renderer related to built-up density.
   */
  builtUpDensity: {

    entries: 8,

    texts: {
      0: { index: 1,  text: ' [0,   3]' },
      1: { index: 2,  text: ' (3,  10]' },
      2: { index: 3,  text: '(10,  25]' },
      3: { index: 4,  text: '(25,  50]' },
      4: { index: 5,  text: '(50,  80]' },
      5: { index: 5,  text: '(80,  90]' },
      6: { index: 5,  text: '(90,  96]' },
      7: { index: 5,  text: '(96, 100]' }
    },

    baseMaps: {
      light: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#ffebd6', // rgb(255, 235, 214)
          1: '#f5cfb3', // rgb(245, 207, 179)
          2: '#edb493', // rgb(237, 180, 147)
          3: '#e69575', // rgb(230, 149, 117)
          4: '#db7356', // rgb(219, 115,  86)
          5: '#d4503b', // rgb(212,  80,  59)
          6: '#cc2e23', // rgb(204,  46,  35)
          7: '#c40a0a', // rgb(196,  10,  10)
        }
      },
      dark: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#ffebd6', // rgb(255, 235, 214)
          1: '#f5cfb3', // rgb(245, 207, 179)
          2: '#edb493', // rgb(237, 180, 147)
          3: '#e69575', // rgb(230, 149, 117)
          4: '#db7356', // rgb(219, 115,  86)
          5: '#d4503b', // rgb(212,  80,  59)
          6: '#cc2e23', // rgb(204,  46,  35)
          7: '#c40a0a', // rgb(196,  10,  10)
        }
      },
      roads: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#ffebd6', // rgb(255, 235, 214)
          1: '#f5cfb3', // rgb(245, 207, 179)
          2: '#edb493', // rgb(237, 180, 147)
          3: '#e69575', // rgb(230, 149, 117)
          4: '#db7356', // rgb(219, 115,  86)
          5: '#d4503b', // rgb(212,  80,  59)
          6: '#cc2e23', // rgb(204,  46,  35)
          7: '#c40a0a', // rgb(196,  10,  10)
        }
      },
      physical: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.6
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#ffebd6', // rgb(255, 235, 214)
          1: '#f5cfb3', // rgb(245, 207, 179)
          2: '#edb493', // rgb(237, 180, 147)
          3: '#e69575', // rgb(230, 149, 117)
          4: '#db7356', // rgb(219, 115,  86)
          5: '#d4503b', // rgb(212,  80,  59)
          6: '#cc2e23', // rgb(204,  46,  35)
          7: '#c40a0a', // rgb(196,  10,  10)
        }
      },
      terrain: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#ffebd6', // rgb(255, 235, 214)
          1: '#f5cfb3', // rgb(245, 207, 179)
          2: '#edb493', // rgb(237, 180, 147)
          3: '#e69575', // rgb(230, 149, 117)
          4: '#db7356', // rgb(219, 115,  86)
          5: '#d4503b', // rgb(212,  80,  59)
          6: '#cc2e23', // rgb(204,  46,  35)
          7: '#c40a0a', // rgb(196,  10,  10)
        }
      },
      satellite: {
        baseStyle: {
          stroke: true,
          color: ColorPalettes.Material.gray700.hex,
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillOpacity: 0.7
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },
        fillColors: {
          0: '#ffebd6', // rgb(255, 235, 214)
          1: '#f5cfb3', // rgb(245, 207, 179)
          2: '#edb493', // rgb(237, 180, 147)
          3: '#e69575', // rgb(230, 149, 117)
          4: '#db7356', // rgb(219, 115,  86)
          5: '#d4503b', // rgb(212,  80,  59)
          6: '#cc2e23', // rgb(204,  46,  35)
          7: '#c40a0a', // rgb(196,  10,  10)
        }
      }
    },

    /**
     * Gets the index of the value.
     *
     * @param v - The value whose index will be retrieved.
     * @returns {number} - The index of the renderer entry.
     */
    getIndex: function(v) {

      return v >=   0 && v <=  30 ? 0 :
             v >   30 && v <= 100 ? 1 :
             v >  100 && v <= 250 ? 2 :
             v >  250 && v <= 500 ? 3 :
             v >  500 && v <= 800 ? 4 :
             v >  800 && v <= 900 ? 5 :
             v >  900 && v <= 960 ? 6 :
                                    7;

    },

    /**
     * Gets a style based on population density value.
     *
     * @param v - The population density value.
     * @param basemap - The basemap whose associated style will be retrieved.
     * @returns - The style used for the specified population density value.
     */
    getFillColor: function(v, basemap) {

      let index = Renderers.builtUpDensity.getIndex(v);

      return Renderers.builtUpDensity.baseMaps[basemap].fillColors[index.toString()];

    },

    /**
     * Gets a style based on population density value.
     *
     * @param v - The population density value.
     * @param basemap - The basemap whose associated style will be retrieved.
     * @returns - The style used for the specified population density value.
     */
    getStyle: function(v, basemap) {

      let index = Renderers.builtUpDensity.getIndex(v);

      let baseStyle = Renderers.builtUpDensity.baseMaps[basemap].baseStyle;
      let fillColor = Renderers.builtUpDensity.baseMaps[basemap].fillColors[index.toString()];

      return {
        stroke: baseStyle.stroke,
        color: baseStyle.color,
        weight: baseStyle.weight,
        opacity: baseStyle.opacity,
        fill: baseStyle.fill,
        fillColor: fillColor,
        fillOpacity: baseStyle.fillOpacity
        //lineCap: 'round',  // butt | round | square | inherit
        //lineJoin: 'round'  // miter | round | bevel | inherit
      }

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
    //this.namedBasemapLayers.physical.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Hydda.Base;
    //this.namedBasemapLayers.physical.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldPhysical;
    this.namedBasemapLayers.physical.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldTopoMap;

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
   * The Outline layer.
   */
  outline: {

    /**
     * The name of the layer.
     */
    name: 'outline',

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
     * Indicates whether this layer is used on the map.
     */
    isUsed: false,

    /**
     * Creates the Greater Manchester Outline layer.
     */
    createLayer: function() {

      // Get the named basemap layer.
      let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;

      this.geoJSON = AppData[AppState.currentUrbanArea].outline;

      this.mapLayer = L.geoJSON(this.geoJSON, {

        /**
         * Style the features of the layer using the associated default style defined for this layer.
         * The default style for this layer depends on the selected background map.
         *
         * @param feature - The feature to style.
         * @returns {Style} - A Style capable of styling polygon features.
         */
        style: function(feature) {
          return MapLayers.outline.namedBasemapLayers[namedBaseMap].defaultStyle;
        }

      });

      // Add the layer on to the map and make sure it is visible.
      this.mapLayer.addTo(Spatial.map);
      this.mapLayer.bringToFront();
      this.isUsed = true;

      // Zoom to the extent of the layer.
      Spatial.map.fitBounds(
        [
          [AppData[AppState.currentUrbanArea].outline.bbox[1], AppData[AppState.currentUrbanArea].outline.bbox[0]],
          [AppData[AppState.currentUrbanArea].outline.bbox[3], AppData[AppState.currentUrbanArea].outline.bbox[2]]
        ],
        { paddingBottomRight: [350, 0] }
      );

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
          layer.setStyle(MapLayers.outline.namedBasemapLayers[currentBaseMap].defaultStyle);
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
        this.isUsed = true;
      }

    },

    /**
     * Removes the LAD layer from the map.
     */
    removeLayer: function() {

      if (Spatial.map.hasLayer(this.mapLayer)) {
        Spatial.map.removeLayer(this.mapLayer);
        this.isUsed = false;
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
     * Indicates whether this layer is used on the map.
     */
    isUsed: false,

    /**
     * Creates the LAD layer.
     */
    createLayer: function() {

      // Get the named basemap layer.
      let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;

      this.geoJSON = AppData[AppState.currentUrbanArea].lad;

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
      this.isUsed = true;

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
        this.isUsed = true;
      }

    },

    /**
     * Removes the LAD layer from the map.
     */
    removeLayer: function() {

      if (Spatial.map.hasLayer(this.mapLayer)) {
        Spatial.map.removeLayer(this.mapLayer);
        this.isUsed = false;
      }

    }

  },

  /**
   * The indices polygons layer
   */
  indices: {

    /**
     * The name of the layer.
     */
    name: 'indices',

    /**
     * The attribution to add on the map related to the indices layer.
     */
    // attribution: 'Data source: ' +
    //   '<a href="https://www.ordnancesurvey.co.uk/" target="_cf">Crown Copyright - Ordnance Survey</a>',
    attribution: '', // TODO: Check attribution of indices layer.

    /**
     * The fields that might be used to display values.
     */
    fields: {
      id:  {
        name: 'id', description: 'Primary Key'
      },
      c:   {
        name: 'numericCode', description: 'Polygon Numeric Code'
      },
      n:   {
        name: 'name', description: 'Name'
      },
      pop: {
        name: 'population', description: 'Population'
      },
      pd:  {
        name: 'populationDensity', description: 'Population Density'
      },
      pp:  {
        name: 'populationPotential', description: 'Population Potential'
      },
      pi:  {
        name: 'periUrbanIndex', description: 'Peri-Urban Index'
      },
      bd:  {
        name: 'builtUpDensity', description: 'BuiltUp Density'
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
       * Object light is used to define the styles used to render the indices layer on top of the Light Basemap.
       */
      light: {

        /**
         * The default style used to render indices polygons on top of the Light Basemap.
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
         * The default style used to highlight the current indices polygon on top of the Light Basemap.
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
       * Object dark is used to define the styles used to render the indices layer on top of the Dark Basemap.
       */
      dark: {

        /**
         * The default style used to render indices polygons on top of the Dark Basemap.
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
         * The default style used to highlight the current indices polygon on top of the Dark Basemap.
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
        }

      },

      /**
       * Object roads is used to define the styles used to render the indices layer on top of the Roads Basemap.
       */
      roads: {

        /**
         * The default style used to render indices polygons on top of the Roads Basemap.
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
         * The default style used to highlight the current indices polygon on top of the Roads Basemap.
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
       * Object physical is used to define the styles used to render the indices layer on top of the Physical Basemap.
       */
      physical: {

        /**
         * The default style used to render indices polygons on top of the Physical Basemap.
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
         * The default style used to highlight the current indices polygon on top of the Physical Basemap.
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
       * Object terrain is used to define the styles used to render the indices layer on top of the Terrain Basemap.
       */
      terrain: {

        /**
         * The default style used to render indices polygons on top of the Terrain Basemap.
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
         * The default style used to highlight the current indices polygon on top of the Terrain Basemap.
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
       * Object satellite is used to define the styles used to render the indices layer on top of the Satellite Basemap.
       */
      satellite: {

        /**
         * The default style used to render indices polygons on top of the Satellite Basemap.
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
         * The default style used to highlight the current indices polygon on top of the Satellite Basemap.
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
     * Indicates whether this layer is used on the map.
     */
    isUsed: false,

    /**
     * The dictionary used to retrieve an internal feature layer based on a feature key.
     * The key used in this case is the indices feature code.
     */
    featureToInternalLayerDictionary: {},

    /**
     * The indices feature selected by the user.
     */
    selectedFeature: null,

    /**
     * The internal layer of the selected indices feature.
     */
    selectedInternalLayer: null,

    /**
     * Creates the indices layer.
     */
    createLayer: function() {

      // Get the named basemap layer.
      let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;

      this.geoJSON = AppData[AppState.currentUrbanArea].indices;

      this.mapLayer = L.geoJSON(this.geoJSON, {

        /**
         * The indices layer attribution to insert on the map.
         */
        attribution: MapLayers.indices.attribution,

        /**
         * Style the features of the layer using the associated default style defined for this layer.
         * The default style for this layer depends on the selected background map.
         *
         * @param feature - The feature to style.
         * @returns {Style} - A Style capable of styling polygon features.
         */
        style: function(feature) {
          let currentRenderer = renderersViewModel.getCurrentRenderer();
          let field = renderersViewModel.renderers[currentRenderer].field;

          return Renderers[MapLayers.indices.fields[field].name].getStyle(feature.properties[field], namedBaseMap);

          // return MapLayers.indices.namedBasemapLayers[
          //          namedBaseMap
          //        ][MapLayers.indices.fields[field].name].getStyle(feature.properties[field]);
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
              MapLayers.indices.showTooltip(layer);
              MapLayers.indices.highlightFeature(feature, layer);
            },

            /**
             * Raised when the mouse is going out of a feature.
             */
            mouseout: function() {
              MapLayers.indices.hideTooltip(layer);
              MapLayers.indices.resetFeatureStyle(feature, layer);
            },

            /**
             * Raised when a feature is clicked.
             */
            click: function() {
              MapLayers.indices.selectFeature(feature);
            }

          });
        }

      });

      // Add the layer in to the map and make sure it is visible.
      this.mapLayer.addTo(Spatial.map);
      this.mapLayer.bringToFront();
      this.isUsed = true;

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
     * Renders the indices layer.
     */
    renderLayer: function() {

      // Get the current basemap. This is used to decide the symbology of the indices polygons.
      let currentBaseMap = toggleBaseMapViewModel.currentBaseMap;

      let currentRenderer = renderersViewModel.getCurrentRenderer();
      let field = renderersViewModel.renderers[currentRenderer].field;

      // Check whether indices features exist or not.
      if (this.geoJSON !== undefined || this.geoJSON !== null) {

        this.mapLayer.eachLayer(function(layer) {
          layer.setStyle(
            // TODO: CHANGE HARDCODE 'pd'
            // MapLayers.indices.namedBasemapLayers[
            //   currentBaseMap
            // ][MapLayers.indices.fields['pd'].name].getStyle(feature.properties.pd)

            // MapLayers.indices.namedBasemapLayers[currentBaseMap].defaultStyle

            Renderers[MapLayers.indices.fields[field].name].getStyle(layer.feature.properties[field], currentBaseMap)

          );
        });

      }

    },

    /**
     * Adds the indices layer on the map.
     */
    addLayer: function() {

      if (!Spatial.map.hasLayer(this.mapLayer)) {
        Spatial.map.addLayer(this.mapLayer);
        this.mapLayer.bringToFront();
        this.isUsed = true;
      }

    },

    /**
     * Removes the indices layer from the map.
     */
    removeLayer: function() {

      if (Spatial.map.hasLayer(this.mapLayer)) {
        Spatial.map.removeLayer(this.mapLayer);
        this.isUsed = false;
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

      // Highlight the current indices feature.
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

      let currentRenderer = renderersViewModel.getCurrentRenderer();
      let field = renderersViewModel.renderers[currentRenderer].field;

      // Render the indices feature using the default style.
      layer.setStyle(
        // TODO: CHANGE HARDCODE 'pd'
        //this.namedBasemapLayers[namedBaseMap][MapLayers.indices.fields['pd'].name].getStyle(feature.properties.pd)

        Renderers[MapLayers.indices.fields[field].name].getStyle(feature.properties[field], namedBaseMap)

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

        // Indices polygon Name
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
   * The urban areas and the layers used to display them on the map.
   */
  urbanAreas: {
    chennai: {
      //layers: [ 'indices', 'outline' ]
      layers: {
        indices: { name: 'Indices' },
        outline: { name: 'Outline' }
      }
    },
    manchester: {
      //layers: [ 'indices', 'lad', 'outline' ]
      layers: {
        indices: { name: 'Indices' },
        lad: {name: 'Local Authority Districts'},
        outline: { name: 'Outline' }
      }
    }
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

    // Move the attribution control to the bottom-left.
    Spatial.map.attributionControl.setPosition('bottomleft');

    // Create the sidebar and add it on the map.
    Spatial.sidebar = L.control.sidebar(
      Spatial.Members.sidebarName, { position: Spatial.Members.sidebarPosition }
    );
    Spatial.sidebar.addTo(Spatial.map);

    BaseMapLayers.setNamedBasemapLayers();
    BaseMapLayers.createBaseMapLayers();

    // Add the layers on the map.
    // let layers = Spatial.urbanAreas[urbanAreasViewModel.selectedUrbanArea].layers;
    //
    // for (let i = 0; i < layers.length; i++) {
    //   MapLayers[layers[i]].createLayer();
    // }

    let layers = Spatial.urbanAreas[AppState.currentUrbanArea].layers;

    for (let layer in layers) {
      if (layers.hasOwnProperty(layer)) {
        MapLayers[layer].createLayer();
      }
    }

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
   * Gets the peri-cene mapping spatial data for the specified urban area.
   *
   * @param urbanArea - The urban area that is used to get its spatial data.
   */
  getPericenePolygonData: function(urbanArea) {

    url = this.baseURL + urbanArea + '.geojson';

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

  },

  methods: {

    onShow2() {

      alert('shown');

      // spinnerViewModel.isVisible = true;
      //
      // for (let layer in MapLayers) {
      //   if (MapLayers.hasOwnProperty(layer)) {
      //     if (MapLayers[layer].isUsed) {
      //       MapLayers[layer].removeLayer();
      //     }
      //   }
      // }
      //
      // AppState.currentUrbanArea = this.selectedUrbanArea;
      //
      // let totalLayers = Spatial.urbanAreas[this.selectedUrbanArea].layers.length;
      //
      // for (let i = 0; i < totalLayers; i++) {
      //   let layer = Spatial.urbanAreas[this.selectedUrbanArea].layers[i];
      //   MapLayers[layer].createLayer();
      // }
      //
      // spinnerViewModel.isVisible = false;

    }

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

      // Render the layers on the map.
      let layers = Spatial.urbanAreas[urbanAreasViewModel.selectedUrbanArea].layers;

      for (let i = 0; i < layers.length; i++) {
        MapLayers[layers[i]].renderLayer();
      }

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

      MapLayers.indices.renderLayer();

      //alert(renderer);

    }

  }

});

/**
 * The urbanAreasViewModel provides the data and logic to allow the user select which urban area is rendered on the map.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let urbanAreasViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#urbanAreasVM',

  /**
   * The model of the view model.
   */
  data: {

    /**
     * The list of urban areas that are rendered on the map.
     */
    urbanAreas: [
      {
        name:  'Chennai',
        value: 'chennai'
      },
      {
        name:  'Manchester',
        value: 'manchester'
      },
      {
        name:  'Urban Area 1',
        value: 'urbanArea1'
      },
      {
        name:  'Urban Area 2',
        value: 'urbanArea2'
      },
    ],

    /**
     * The selected urban area.
     */
    selectedUrbanArea: 'manchester'

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
     *  Executes when the selected urban area has been changed.
     */
    onSelectedUrbanAreaChanged() {

      // let url = 'https://raw.githubusercontent.com/spa-lab/peri-cene/main/geojson/' + this.selectedUrbanArea + '.geojson';
      //
      // let message = 'Value: ' + this.selectedUrbanArea + '\r\n' +
      //               'URL:   ' + url;
      //
      // alert(message);

      spinnerViewModel.isVisible = true;

      for (let layer in MapLayers) {
        if (MapLayers.hasOwnProperty(layer)) {
          if (MapLayers[layer].isUsed) {
            MapLayers[layer].removeLayer();
          }
        }
      }

      AppState.currentUrbanArea = this.selectedUrbanArea;

      // let totalLayers = Spatial.urbanAreas[this.selectedUrbanArea].layers.length;
      //
      // for (let i = 0; i < totalLayers; i++) {
      //   let layer = Spatial.urbanAreas[this.selectedUrbanArea].layers[i];
      //   MapLayers[layer].createLayer();
      // }

      let layers = Spatial.urbanAreas[AppState.currentUrbanArea].layers;

      for (let layer in layers) {
        if (layers.hasOwnProperty(layer)) {
          MapLayers[layer].createLayer();
        }
      }

      mapLegendViewModel.updateView();

      spinnerViewModel.isVisible = false;

    }

  }

});

/**
 * The mapLegendViewModel provides the data and logic to display the map legend on the web page.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let mapLegendViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#mapLegendVM',

  /**
   * The model of the view model.
   */
  data: {

    layers: {
      outline: 'Outline',
      lad: 'Local Authority Districts',
      indices: 'Indices'
    }

  },

  /**
   * The computed properties of the model of the view model.
   */
  computed: {

    outlineLayerName: {
      get() {
        return this.getLayerName('outline');
      },
      set() {

      }
    },

    getLadLayerName: function() {
      return this.getLayerName('lad');
    },

    getIndicesLayerName: function() {
      return this.getLayerName('indices');
    }

  },

  /**
   * The methods of the view model.
   */
  methods: {

    isLayerUsed: function(layer) {
      return Spatial.urbanAreas[AppState.currentUrbanArea].layers.hasOwnProperty(layer);

      //return Spatial.urbanAreas[AppState.currentUrbanArea].layers.hasOwnProperty(layer);
    },

    getLayerName: function(layer) {
      let layers = Spatial.urbanAreas[AppState.currentUrbanArea].layers;
      return layers.hasOwnProperty(layer) ? layers[layer].name : 'NULL';
    },

    updateView: function() {

      let lyrs = Spatial.urbanAreas[AppState.currentUrbanArea].layers;

      for (let layer in this.layers) {
        if (lyrs.hasOwnProperty(layer)) {
          this.layers[layer] = lyrs[layer].name
        }
        else {
          this.layers[layer] = 'NULL';
        }
      }

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
