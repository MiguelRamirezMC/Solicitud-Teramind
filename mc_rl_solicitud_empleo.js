/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 */
define([
    "N/record",
    "N/error",
    "N/query",
    "N/search",
    "N/file",
    "N/encode",
], function (record, error, query, search, file, encode) {
    function doValidation(args, argNames, methodName) {
        debugger;

        for (var i = 0; i < args.length; i++)
            if (!args[i] && args[i] !== 0)
                throw error.create({
                    name: "MISSING_REQ_ARG",
                    message:
                        "Missing a required argument: [" +
                        argNames[i] +
                        "] for method: " +
                        methodName,
                });
    }

    function getContacto() {
        var data = [];
        var mySearch = search.create({
            type: "customlist_mc_posiciones",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
        }
        return data;
    }

    function getSkill() {
        var data = [];
        var mySearch = search.create({
            type: "customrecord_mc_skills",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 1000,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
        }
        return data;
    }

    function getNacionalidad() {
        var data = [];
        var mySearch = search.create({
            type: "customlist_mc_nacionalidades",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
        }
        return data;
    }

    function getSexo() {
        var data = [];
        var mySearch = search.create({
            type: "customlist230",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
        }
        return data;
    }

    function getCategoriaLicen() {
        var data = [];
        var mySearch = search.create({
            type: "customlist_mc_categorias_licencias",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
            //log.debug(resultaRange[i]);
        }
        return data;
    }

    function getEstadoCivil() {
        var data = [];
        var mySearch = search.create({
            type: "customlist_mc_estados_civiles",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
            //log.debug(resultaRange[i]);
        }
        return data;
    }

    function getSucursal() {
        var data = [];
        var mySearch = search.create({
            type: "customlist_mc_sucursales",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
            //log.debug(resultaRange[i]);
        }
        return data;
    }

    function getNivel() {
        var data = [];
        var mySearch = search.create({
            type: "customlist_mc_niveles",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
            //log.debug(resultaRange[i]);
        }
        return data;
    }

    function getArea() {
        var data = [];
        var mySearch = search.create({
            type: "customlist_area",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
            //log.debug(resultaRange[i]);
        }
        return data;
    }

    function getDpto() {
        var data = [];
        var mySearch = search.create({
            type: "department",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
            //log.debug(resultaRange[i]);
        }
        return data;
    }

    function getEstatus() {
        var data = [];
        var mySearch = search.create({
            type: "customlist_mc_estatus",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
            //log.debug(resultaRange[i]);
        }
        return data;
    }

    function getPrioridad() {
        var data = [];
        var mySearch = search.create({
            type: "customlist_mc_prioridades",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
            //log.debug(resultaRange[i]);
        }
        return data;
    }

    function getRazonDesestimar() {
        var data = [];
        var mySearch = search.create({
            type: "customlistrazondesestimacion",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
            //log.debug(resultaRange[i]);
        }
        return data;
    }

    function getGrados() {
        var data = [];
        var mySearch = search.create({
            type: "customlist_mc_grados_universitarios",
            columns: ["name", "isinactive"],
        });

        var myResultSet = mySearch.run();

        var resultRange = myResultSet.getRange({
            start: 0,
            end: 950,
        });

        for (var i = 0; i < resultRange.length; i++) {
            data[i] = {
                id: resultRange[i].id,
                NamePosicion: resultRange[i].getValue({ name: "name" }),
                isinactive: resultRange[i].getValue({ name: "isinactive" }),
            };
            //log.debug(resultaRange[i]);
        }
        return data;
    }

    //ProcesoPara formatear fecha
    var getData_formatFecha = function (ffecha) {
        // Assuming Date format is MM/DD/YYYY

        var objFecha = format.parse({
            value: ffecha,
            type: format.Type.DATE,
        });
        var formatFechaString = format.format({
            value: objFecha,
            type: format.Type.DATE,
        });
        return { objFecha, formatFechaString };
    };

    var createRecord = {
        solicitudEmpleo: (data) => {
            // var datos = new Date(data.fechaNacimiento);
            var errorEnviandoData = ""; //data; // data //getData_formatFecha(data).objFecha; //getData_formatFecha(Date(new Date)).objFecha;

            try {
                var solicitud = record.create({
                    type: "customrecord_mc_cr_solicitud_empleo",
                    isDynamic: true,
                });

                // var fecha = new Date(data.trandate)
                //Informacion personal
                solicitud.setValue({
                    fieldId: "name",
                    value:
                        data.nombre +
                        " " +
                        data.primerApellido +
                        " " +
                        data.segundoApellido,
                });

                solicitud.setText({
                    fieldId: "custrecord_mc_politicas_privacidad",
                    text: data.checkPrivacidad ? "T" : "F",
                });

                solicitud.setText({
                    fieldId: "custrecord_mc_politicas_seguridad",
                    text: data.checkSeguridad ? "T" : "F",
                });

                solicitud.setValue({
                    fieldId: "custrecord_mc_nombres",
                    value: data.nombre,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_primer_apellido",
                    value: data.primerApellido,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_segundo_apellido",
                    value: data.segundoApellido,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_puesto_vacante",
                    value: data.puestoAplica,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_cedula",
                    value: data.cedula,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_sucursal",
                    value: data.sucursalAplica,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_sexo",
                    value: data.sexo,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_fecha_nacimiento",
                    value: new Date(data.fechaNacimiento),
                }); //data.fechaNacimiento });
                solicitud.setValue({
                    fieldId: "custrecord_mc_nacionalidad",
                    value: data.nacionalidad,
                });

                solicitud.setValue({
                    fieldId: "custrecord_mc_pais_nacimiento",
                    value: data.paisNacimiento,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_estado_civil",
                    value: data.estadoCivil,
                });
                // errorEnviandoData =  data.checkPasaporte ? 'T' : 'F';
                solicitud.setText({
                    fieldId: "custrecord_mc_posee_pasaporte",
                    text: data.checkPasaporte ? "T" : "F",
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_pasaporte",
                    value: data.pasaporte,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_celular",
                    value: data.celular,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_telf_residencial",
                    value: data.telefono,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_correo_electronico",
                    value: data.email,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_direccion",
                    value: data.direccion,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_pais_residencia",
                    value: data.paisReside,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_ciudad_residencia",
                    value: data.ciudad,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_sector_residencia",
                    value: data.sector,
                });
                solicitud.setText({
                    fieldId: "custrecord_mc_licencia_conducir",
                    text: data.checkLicencia ? "T" : "F",
                });
                solicitud.setText({
                    fieldId: "custrecord_mc_vehiculo_propio",
                    text: data.checkVehiculo ? "T" : "F",
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_categoria_licencia",
                    value: data.categoriaLicencia,
                });
                solicitud.setText({
                    fieldId: "custrecord_mc_permiso_trabajo",
                    text: data.checkPermiso ? "T" : "F",
                });
                solicitud.setText({
                    fieldId: "custrecord_mc_mudarse_residencia",
                    text: data.checkMudarse ? "T" : "F",
                });
                solicitud.setText({
                    fieldId: "custrecord_mc_traslado_trabajo",
                    text: data.checkTraslado ? "T" : "F",
                });
                solicitud.setText({
                    fieldId: "custrecord_mc_inicio_inmediato",
                    text: data.checkInicio ? "T" : "F",
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_fecha_disponibilidad",
                    value: new Date(data.fechaDisponibilidad),
                });
                solicitud.setText({
                    fieldId: "custrecord_mc_acuerdo_confidencialidad",
                    text: data.checkConfidencial ? "T" : "F",
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_sueldo_aspirante",
                    value: data.sueldo,
                });

                //Informacion familiar
                solicitud.setValue({
                    fieldId: "custrecord_mc_nombre_padre",
                    value: data.nombrePadre,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_ocupacion_padre",
                    value: data.ocupacionPadre,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_lugar_trabajo_padre",
                    value: data.trabajoPadre,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_nombre_madre",
                    value: data.nombreMadre,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_ocupacion_madre",
                    value: data.ocupacionMadre,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_lugar_trabajo_madre",
                    value: data.trabajoMadre,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_nombre_conyugue",
                    value: data.nombreConyugue,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_ocupacion_conyugue",
                    value: data.ocupacionConyugue,
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_lugar_trabajo_conyugue",
                    value: data.trabajoConyugue,
                });
                solicitud.setText({
                    fieldId: "custrecord_mc_tiene_hijos",
                    text: data.checkHijos ? "T" : "F",
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_cantidad_hijos",
                    value: data.cantidadHijos,
                });

                //Experiencia laboral
                solicitud.setText({
                    fieldId: "custrecord_mc_simil_multicomputos",
                    text: data.checkedEmpresaSimilar ? "T" : "F",
                });
                solicitud.setText({
                    fieldId: "custrecord_mc_familiar_multicomputos",
                    text: data.checkFamiliaMC ? "T" : "F",
                });
                solicitud.setValue({
                    fieldId: "custrecord_mc_nombre_familiar_mc",
                    value: data.nombreFamiliaMC,
                });
                solicitud.setText({
                    fieldId: "custrecord_mc_solicitud_otra_posicion_mc",
                    text: data.checkSolicitud ? "T" : "F",
                });
                var fileObj = file.create({
                    name: "archivo.pdf",
                    fileType: file.Type.PDF,
                    contents: data.curriculum,
                    folder: 124,
                });
                var fileId = fileObj.save();
                for (var i = 0; i < data.rowsHijos.length; i++) {
                    solicitud.selectNewLine({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                    });
                    solicitud.selectLine({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        line: i,
                    });

                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "custrecord_mc_nombre_hijo",
                        value: data.rowsHijos[i].nombreHijo,
                    });

                    solicitud.setCurrentSublistText({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "custrecord_mc_mayoria_edad",
                        text: data.rowsHijos[i].mayoriaEdad ? "T" : "F",
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "custrecord_mc_ocupacion_hijo",
                        value: data.rowsHijos[i].ocupacionHijo,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "custrecord_mc_lugar_trabajo_hijo",
                        value: data.rowsHijos[i].lugarTrabajoHijo,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "custrecord_mc_telefono_hijo",
                        value: data.rowsHijos[i].telefonoHijo,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "custrecord_mc_edad_hijo",
                        value: data.rowsHijos[i].edadHijo,
                    });

                    solicitud.commitLine({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                    });
                }

                // //Llenar experiencia
                for (var i = 0; i < data.rowsExp.length; i++) {
                    var motivoSalida = data.rowsExp[i].motivoSalida.split("-");
                    var codigoMotivoSalida = motivoSalida[0].trim();

                    solicitud.selectNewLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                    });
                    solicitud.selectLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        line: i,
                    });

                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_nombre_empresa_experiencia",
                        value: data.rowsExp[i].nombreEmpresa,
                    });

                    solicitud.setCurrentSublistText({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_similar_mc",
                        text: data.rowsExp[i].checkEmpresaSimilar ? "T" : "F",
                    });

                    // solicitud.setCurrentSublistValue({
                    //   sublistId: "recmachcustrecord_mc_persona_solicitante_exp",
                    //   fieldId: "custrecord_mc_direccion_empresa_exp",
                    //   value: data.rowsExp[i].direccionEmpresa,
                    // });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_telf_empresa_exp_laboral",
                        value: data.rowsExp[i].telefonoEmpresa,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_nivel_empresa_exp_laboral",
                        value: data.rowsExp[i].nivelEmpresa.id,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_area_empresa_exp_laboral",
                        value: data.rowsExp[i].areaEmpresa.id,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_nombre_posicion_exp",
                        value: data.rowsExp[i].nombrePosicion,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_nombre_supervisor_exp",
                        value: data.rowsExp[i].nombreSupervisor,
                    });

                    solicitud.setCurrentSublistText({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_empleo_actual",
                        text: data.rowsExp[i].cbEmpleoActual ? "T" : "F",
                    });

                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_responsabilidades_exp",
                        value: data.rowsExp[i].responsabilidades,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_fecha_entrada_empresa_exp",
                        value: new Date(data.rowsExp[i].fechaEntrada),
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_fecha_salida_empresa_exp",
                        value: data.rowsExp[i].fechaSalida
                            ? new Date(data.rowsExp[i].fechaSalida)
                            : "",
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_salario_inicial_exp",
                        value: data.rowsExp[i].salarioInicial,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_salario_final_empresa_exp",
                        value: data.rowsExp[i].salarioFinal
                            ? data.rowsExp[i].salarioFinal
                            : 0,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                        fieldId: "custrecord_mc_motivo_salida_empresa_exp",
                        value: codigoMotivoSalida,
                    });

                    solicitud.commitLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_exp",
                    });
                }
                for (var i = 0; i < data.rowsCertifi.length; i++) {
                    solicitud.selectNewLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_certi",
                    });

                    solicitud.selectLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_certi",
                        line: i,
                    });

                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_certi",
                        fieldId: "custrecord_mc_nombre_certificaciones",
                        value: data.rowsCertifi[i].nombreCerti,
                    });

                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_certi",
                        fieldId: "custrecord_mc_intitucion",
                        value: data.rowsCertifi[i].intitucionCerti,
                    });

                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_certi",
                        fieldId: "custrecord_mc_fecha_obtencion_certificad",
                        value: new Date(data.rowsCertifi[i].fechaObtencion),
                    });

                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_certi",
                        fieldId: "custrecord_mc_fecha_caducidad",
                        value: data.rowsCertifi[i].fechaCaducidad
                            ? new Date(data.rowsCertifi[i].fechaCaducidad)
                            : "",
                    });

                    solicitud.commitLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_certi",
                    });
                }

                // // errorEnviandoData = 'Llenar referencias';
                //Llenar referencias
                for (var i = 0; i < data.rowsRefes.length; i++) {
                    // var tipoRefe = data.rowsRefes[i].tipoRefe.split("-");
                    // var codigoTipoRefe = tipoRefe[0].trim();

                    solicitud.selectNewLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_refes",
                    });
                    solicitud.selectLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_refes",
                        line: i,
                    });

                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_refes",
                        fieldId: "custrecord_mc_tipo_referencia",
                        value: data.rowsRefes[i].tipoRefe.value,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_refes",
                        fieldId: "custrecord_mc_nombre_referencia",
                        value: data.rowsRefes[i].nombreRefe,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_refes",
                        fieldId: "custrecord_mc_direccion_referencia",
                        value: data.rowsRefes[i].direccionRefe,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_refes",
                        fieldId: "custrecord_mc_ocupacion_referencia",
                        value: data.rowsRefes[i].ocupacionRefe,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_refes",
                        fieldId: "custrecord_mc_telefono_referencia",
                        value: data.rowsRefes[i].telefonoRefe,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_refes",
                        fieldId: "custrecord_mc_empresa_referencia",
                        value: data.rowsRefes[i].empresaRefe,
                    });

                    solicitud.commitLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_refes",
                    });
                }

                // //Llenar formacion educativa
                for (var i = 0; i < data.rowsEduca.length; i++) {
                    // var tipoEducacion = data.rowsEduca[i].tipoEducacion.split("-");
                    // var codigoTipoEducacion = tipoEducacion[0].trim();

                    solicitud.selectNewLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_educa",
                    });
                    solicitud.selectLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_educa",
                        line: i,
                    });

                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_educa",
                        fieldId: "custrecord_mc_nombre_institucion",
                        value: data.rowsEduca[i].nombreInsti,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_educa",
                        fieldId: "custrecord_mc_tipo_educacion",
                        value: data.rowsEduca[i].tipoEducacion.value,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_educa",
                        fieldId: "custrecord_mc_fecha_inicio_institucion",
                        value: new Date(data.rowsEduca[i].fechaInicio),
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_educa",
                        fieldId: "custrecord_mc_fecha_termino_institucion",
                        value: data.rowsEduca[i].fechaTermino
                            ? new Date(data.rowsEduca[i].fechaTermino)
                            : "",
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_educa",
                        fieldId: "custrecord_mc_grado_obtenido",
                        value: data.rowsEduca[i].gradoObtenido.id,
                    });
                    solicitud.setCurrentSublistText({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_educa",
                        fieldId: "custrecord_mc_actualmente_cursando",
                        text: data.rowsEduca[i].cursando ? "T" : "F",
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_educa",
                        fieldId: "custrecord_indice_academico",
                        value: data.rowsEduca[i].indice,
                    });
                    solicitud.commitLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_educa",
                    });
                }

                // // //Llenar skills
                for (var i = 0; i < data.rowsSkills.length; i++) {
                    // var nombreSkill = data.rowsSkills[i].nombreSkill.split("-");
                    // var codigoNombreSkill = nombreSkill[0].trim();

                    solicitud.selectNewLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_skills",
                    });
                    solicitud.selectLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_skills",
                        line: i,
                    });

                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_skills",
                        fieldId: "custrecord_mc_nombre_skill",
                        value: data.rowsSkills[i].nombreSkill.id,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_skills",
                        fieldId: "custrecord_mc_nivel",
                        value: data.rowsSkills[i].anosExp,
                    });
                    solicitud.setCurrentSublistText({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_skills",
                        fieldId: "custrecord_mc_de_interes",
                        text: data.rowsSkills[i].deInteres ? "T" : "F",
                    });
                    solicitud.setCurrentSublistText({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_skills",
                        fieldId: "custrecord_mc_top_skill",
                        text: data.rowsSkills[i].topSkill ? "T" : "F",
                    });

                    solicitud.commitLine({
                        sublistId:
                            "recmachcustrecord_mc_persona_solicitante_skills",
                    });
                }

                var id = solicitud.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: true,
                });
            } catch (error) {
                return { id: 0, message: JSON.stringify(errorEnviandoData) };
            }

            var solicitud_load = record.load({
                type: "customrecord_mc_cr_solicitud_empleo",
                id: id,
                ignoreFieldChange: true,
            });

            var id_pedido = solicitud_load.getValue({ fieldId: "tranid" });
            return {
                id: id,
                numeroSolicitud: id_pedido,
                message: "Solicitud creada",
            };
        },
        createPedidoVenta: (data) => {
            try {
                var solicitud = record.create({
                    type: record.Type.SALES_solicitud,
                    isDynamic: true,
                });

                var fecha = new Date(data.trandate);
                solicitud.setValue({ fieldId: "entity", value: data.entity });
                solicitud.setValue({ fieldId: "trandate", value: fecha });
                //solicitud.setValue({fieldId:'solicitudstatus', value: data.solicitudstatus});

                solicitud.setValue({
                    fieldId: "otherrefnum",
                    value: data.otherrefnum,
                });

                solicitud.setValue({ fieldId: "memo", value: data.memo });
                solicitud.setValue({
                    fieldId: "salesrep",
                    value: data.salesrep,
                }); //Op
                solicitud.setValue({
                    fieldId: "shipaddresslist",
                    value: data.shipaddress,
                });
                solicitud.setValue({
                    fieldId: "billaddresslist",
                    value: data.billaddress,
                });
                solicitud.setValue({
                    fieldId: "discountrecmachcustrecord_mc_persona_solicitante",
                    value: data.discountrecmachcustrecord_mc_persona_solicitante,
                });
                log.debug("Error byFC Dir Envio", data.shipaddress);
                log.debug("Error byFC Dir facturacion ", data.billaddress);

                for (var i = 0; i < data.detalle.length; i++) {
                    solicitud.selectNewLine({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                    });
                    solicitud.selectLine({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        line: i,
                    });

                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "recmachcustrecord_mc_persona_solicitante",
                        value: data.detalle[i]
                            .recmachcustrecord_mc_persona_solicitante,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "quantity",
                        value: data.detalle[i].quantity,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "units",
                        value: data.detalle[i].units,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "price",
                        value: data.detalle[i].price,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "taxcode",
                        value: data.detalle[i].taxcode,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "rate",
                        value: data.detalle[i].rate,
                    });
                    solicitud.setCurrentSublistValue({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                        fieldId: "pricelevels",
                        value: data.detalle[i].pricelevels,
                    });

                    solicitud.commitLine({
                        sublistId: "recmachcustrecord_mc_persona_solicitante",
                    });
                }

                var id = solicitud.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: true,
                });
            } catch (error) {
                return { id: 0, message: error };
            }

            var solicitud_load = record.load({
                type: record.Type.SALES_solicitud,
                id: id,
                ignoreFieldChange: true,
            });

            var id_pedido = solicitud_load.getValue({ fieldId: "tranid" });
            return { id: id, numPedido: id_pedido, message: "Pedido creado" };
        },

        createFacturaVenta: () => {},

        getPedidos: (id) => {
            let term = [];
            //getData_recmachcustrecord_mc_persona_solicitantesPrice_by_id('Z-0001');
            //get Datos articulos
            //Query para buscar datos de los articulos.

            var recmachcustrecord_mc_persona_solicitantesQuery = query.create({
                type: query.Type.salessolicitud,
            });

            //Crear condiciones
            var firstCondition =
                recmachcustrecord_mc_persona_solicitantesQuery.createCondition({
                    fieldId: "isinactive",
                    operator: query.Operator.IS,
                    values: false,
                });

            //Crear condiciones
            var secondCondition =
                recmachcustrecord_mc_persona_solicitantesQuery.createCondition({
                    fieldId: "otherrefnum",
                    operator: query.Operator.EQUAL,
                    values: id,
                });

            //Agregar condicion
            recmachcustrecord_mc_persona_solicitantesQuery.condition =
                recmachcustrecord_mc_persona_solicitantesQuery.and(
                    firstCondition,
                    secondCondition
                );

            //Crear columnas
            recmachcustrecord_mc_persona_solicitantesQuery.columns = [
                recmachcustrecord_mc_persona_solicitantesQuery.createColumn({
                    fieldId: "id",
                }),
                recmachcustrecord_mc_persona_solicitantesQuery.createColumn({
                    fieldId: "otherrefnum",
                }),
            ];

            //solicitudnar by Id
            recmachcustrecord_mc_persona_solicitantesQuery.sort = [
                recmachcustrecord_mc_persona_solicitantesQuery.createSort({
                    column: recmachcustrecord_mc_persona_solicitantesQuery
                        .columns[0],
                    ascending: false,
                }),
            ];

            //Ejecutar el query pra extrar los resultados;
            let resulSetTerm =
                recmachcustrecord_mc_persona_solicitantesQuery.run();

            //Asignar resultados;
            let resultsTerm = resulSetTerm.results;

            if (resultsTerm.length > 0) {
                return { error: "Pedido existe" };
            }
        },

        createNotaCredito: () => {},
    };
    // Get a standard NetSuite record
    function _get(context) {
        debugger;

        try {
            switch (context.recordtype) {
                //Get Help
                case "help":
                    var data = help();
                    log.debug(data);
                    break;

                //getPuestoAplica
                case "getPuestoAPlica":
                    var data = getPuestoAPlica();
                    log.debug(data);
                    break;

                //getNacionalidad
                case "getNacionalidad":
                    var data = getNacionalidad();
                    log.debug(data);
                    break;

                case "getSkill":
                    var data = getSkill();
                    log.debug(data);
                    break;

                //getSexo
                case "getSexo":
                    var data = getSexo();
                    log.debug(data);
                    break;

                //getCategoriaLicen
                case "getCategoriaLicen":
                    var data = getCategoriaLicen();
                    log.debug(data);
                    break;

                //getEstadoCivil
                case "getEstadoCivil":
                    var data = getEstadoCivil();
                    log.debug(data);
                    break;

                //getSucursal
                case "getSucursal":
                    var data = getSucursal();
                    log.debug(data);
                    break;

                //getNivel
                case "getNivel":
                    var data = getNivel();
                    log.debug(data);
                    break;

                //getArea
                case "getArea":
                    var data = getArea();
                    log.debug(data);
                    break;

                //getDpto
                case "getDpto":
                    var data = getDpto();
                    log.debug(data);
                    break;

                //getEstatus
                case "getEstatus":
                    var data = getEstatus();
                    log.debug(data);
                    break;

                //getPrioridad
                case "getPrioridad":
                    var data = getPrioridad();
                    log.debug(data);
                    break;

                //getRazonDesestimar
                case "getRazonDesestimar":
                    var data = getRazonDesestimar();
                    log.debug(data);
                    break;

                //getGrados
                case "getGrados":
                    var data = getGrados();
                    log.debug(data);
                    break;
            }
        } catch (error) {
            log.debug({ title: "Error Get data:", details: error.message });

            return JSON.stringify({ id: 0, error: error.message });
        }

        return JSON.stringify(data);
    }

    // Delete a standard NetSuite record
    function _delete(context) {
        doValidation(
            [context.recordtype, context.id],
            ["recordtype", "id"],
            "DELETE"
        );
        record.delete({
            type: context.recordtype,
            id: context.id,
        });
        return String(context.id);
    }
    // Create a NetSuite record from request params
    function _post(context) {
        var recordCreate = "";

        recordCreate = createRecord.solicitudEmpleo(context);

        return JSON.stringify(recordCreate);
    }
    // Upsert a NetSuite record from request param
    function put(context) {
        doValidation(
            [context.recordtype, context.id],
            ["recordtype", "id"],
            "PUT"
        );
        var rec = record.load({
            type: context.recordtype,
            id: context.id,
        });
        for (var fldName in context)
            if (context.hasOwnProperty(fldName))
                if (fldName !== "recordtype" && fldName !== "id")
                    rec.setValue(fldName, context[fldName]);
        rec.save();
        return JSON.stringify(rec);
    }

    function help() {
        const metodo = [
            { Nombre: "getNivel()", Parametro: "", Type: "get" },
            { Nombre: "getPuestoAPlica()", Parametro: "", Type: "get" },
            { Nombre: "getNacionalidad()", Parametro: "", Type: "get" },
            { Nombre: "getSexo()", Parametro: "", Type: "get" },
            { Nombre: "getCategoriaLicen()", Parametro: "", Type: "get" },
            { Nombre: "getEstadoCivil()", Parametro: "", Type: "get" },
            { Nombre: "getSucursal()", Parametro: "", Type: "get" },
            { Nombre: "getArea()", Parametro: "", Type: "get" },
            { Nombre: "getDpto()", Parametro: "", Type: "get" },
            { Nombre: "getEstatus()", Parametro: "", Type: "get" },
            { Nombre: "getPrioridad()", Parametro: "", Type: "get" },
            { Nombre: "getRazonDesestimar()", Parametro: "", Type: "get" },
            { Nombre: "getSkill()", Parametro: "", Type: "get" },
            { Nombre: "getGrados()", Parametro: "", Type: "get" },
        ];
        return JSON.stringify(metodo);
    }
    return {
        get: _get,
        delete: _delete,
        post: _post,
        put: put,
    };
});
