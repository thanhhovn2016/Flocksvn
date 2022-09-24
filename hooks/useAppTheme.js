import { createTheme, useMediaQuery } from "@mui/material";


const useTheme = () => {
    
    let theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: "#D9FD00",
                dark: "#AAC600",
                light: "#7AC500"
            },
            secondary: {
                main: "#F8F8F8",
                dark: "#3B4E56"
            },
            orange: {
                main: "#E75E01"
            },
            lightOrange: {
                main: "#EA7500"
            },
            gray : {
                main: "#888888"
            }
        },
        typography: {
            // fontFamily: "Roboto !important"
        },
        components: {
            
            MuiTextField: {
               
                styleOverrides: {
                    root: {
                        width: "100%",
                        fontFamily: "gilory-semiBold"
                    }
                }
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        fontFamily: 'gilory-semiBold'
                    }
                }
            },
            // MuiOutlinedInput: {
            //     styleOverrides: {
            //         root: {
            //             borderRadius: 10,
            //             height: 54,
            //             overflow: "visible",
            //             fontFamily: "gilory-semiBold"
            //             // width: 345
            //         }
            //     }
            // },

            // MuiTextField: {
               
            //     styleOverrides: {
            //         root: {
            //             width: "100%",
            //             fontFamily: "titilliumweb-regular",
                        
            //         }
            //     }
            // },
            MuiInputLabel: {
                styleOverrides: {
                    required: {
                        color: "red",
                        backgroundColor: "red"
                    }
                }
            },
            // MuiAlert: {
            //     styleOverrides: {
            //         root: {
            //             fontFamily: 'titilliumweb-regular',
            //         }
            //     }
            // },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        height: 54,
                        overflow: "visible",
                        // fontFamily: "titilliumweb-regular",
                        border: "1px solid #31313180",
                        fontFamily: "gilory-semiBold"
                       
                    }
                }
            },
            MuiInputLabel: {
                
                styleOverrides: {
                    root: {
                        overflow:"visible",
                        overflowWrap: "break-word",
                        width: "100%",
                        marginBottom: 4
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        // backgroundColor: "#0E213E",
                        borderRadius: 16,
                        p:3

                    }
                }
            },
            MuiTypography: {
                styleOverrides: {
                
                    h1: {
                        fontFamily: 'gilory-black',
                        
                        
                    },
                    h2: {
                        fontFamily: 'gilory-black',
                        
                        
                        
                    },
                    h3: {
                        fontFamily: 'gilory-black',
                        
                        
                        
                    },
                    h4: {
                        fontFamily: 'gilory-black',
                        
                        
                        
                    },
                    h5: {
                        fontFamily: 'gilory-semibold',
                        
                        
                        
                    },
                    h6: {
                        fontFamily: 'gilory-semibold',
                        
                        
                        
                    },
                    body1: {
                        fontFamily: 'gilory-semiBold',
                        lineHeight: 2
                        
                    },
                    body2: {
                        fontFamily: 'gilory-semiBold',
                        lineHeight: 2
                    }
                }
            },
            MuiStepIcon: {
                styleOverrides: {
                    text: {
                        fontFamily: "gilory-semiBold",
                        color: "#fff",
                    }
                }
            },
            MuiSlider: {
                styleOverrides: {
                    root: {
                        paddingTop: 10
                    }
                }
            },
            MuiBackdrop: {
                styleOverrides: {
                    root: {
                        zIndex: 1000
                    }
                }
            }
        }
    });

    const isMobile = useMediaQuery(() => theme.breakpoints.down("md"));

    theme = createTheme(theme, {
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "capitalize",
                        fontFamily: "titilliumweb-semibold",
                        fontWeight: "bold",
                        color: theme.palette.gray.main,
                        boxShadow: "none",
                        ":hover": {
                            backgroundColor: theme.palette.primary.main,
                            boxShadow: "none",
                        }
                    },
                  outlinedPrimary: {
                      transition: "background-color 0.5s ease, padding 0.8s linear",
                      ":hover": {
                          backgroundColor: isMobile ? "transparent" : theme.palette.primary.main,
                          color: isMobile ? "#fff" : "#0a0c49"
                      }
                  },
                  containedPrimary: {
                      color: "#fff"
                  }
                }  
              },
            MuiStepLabel: {
                styleOverrides: {
                    label: {
                        backgroundColor: "#fff",
                        padding: "10px 16px",
                        borderRadius: 10,
                        ":active": {
                            backgroundColor: "#fff"
                        },
                        "::before": {
                            content: `" "`,
                            height: 0,
                            position: "absolute",
                            top: "22px",
                            width: 0,
                            zIndex: 1,
                            right: "30px",
                            border: "medium solid white",
                            borderWidth: "10px 0 10px 10px",
                            borderColor: "transparent transparent transparent black",
                        }
                
                    },
                }
            }
        }
    })

    return theme;
}

export default useTheme;