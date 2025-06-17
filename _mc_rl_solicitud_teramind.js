/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 */
define(["N/record", "N/error", "N/search", "N/format"], function (
  record,
  error,
  search,
  format
) {
  function doValidation(args, argNames, methodName) {
    for (var i = 0; i < args.length; i++) {
      if (args[i] === null || args[i] === undefined) {
        throw error.create({
          name: "MISSING_REQ_ARG",
          message: "Missing argument [" + argNames[i] + "] for " + methodName,
        });
      }
    }
  }

  function getTerritorios() {
    var data = [];
    var srch = search.create({ type: "territory", columns: ["name", "isinactive"] });
    var results = srch.run().getRange({ start: 0, end: 1000 });
    for (var i = 0; i < results.length; i++) {
      data.push({
        id: results[i].id,
        name: results[i].getValue("name"),
        isinactive: results[i].getValue("isinactive"),
      });
    }
    return data;
  }

  function getEnfoques() {
    var data = [];
    var srch = search.create({ type: "customlist_mc_enfoque", columns: ["name", "isinactive"] });
    var results = srch.run().getRange({ start: 0, end: 1000 });
    for (var i = 0; i < results.length; i++) {
      data.push({
        id: results[i].id,
        name: results[i].getValue("name"),
        isinactive: results[i].getValue("isinactive"),
      });
    }
    return data;
  }

  function getIndustrias() {
    var data = [];
    var srch = search.create({ type: "customlist_mc_industria", columns: ["name", "isinactive"] });
    var results = srch.run().getRange({ start: 0, end: 1000 });
    for (var i = 0; i < results.length; i++) {
      data.push({
        id: results[i].id,
        name: results[i].getValue("name"),
        isinactive: results[i].getValue("isinactive"),
      });
    }
    return data;
  }

  function getCantidadEmpleados() {
    var data = [];
    var srch = search.create({ type: "customlist_mc_cantidad_empleados", columns: ["name", "isinactive"] });
    var results = srch.run().getRange({ start: 0, end: 1000 });
    for (var i = 0; i < results.length; i++) {
      data.push({
        id: results[i].id,
        name: results[i].getValue("name"),
        isinactive: results[i].getValue("isinactive"),
      });
    }
    return data;
  }

  function getSubsidiarias() {
    var data = [];
    var srch = search.create({ type: "customlist_mc_subsidiaria", columns: ["name", "isinactive"] });
    var results = srch.run().getRange({ start: 0, end: 1000 });
    for (var i = 0; i < results.length; i++) {
      data.push({
        id: results[i].id,
        name: results[i].getValue("name"),
        isinactive: results[i].getValue("isinactive"),
      });
    }
    return data;
  }

  function getClientes() {
    var data = [];
    var srch = search.create({ type: "customlist_mc_cliente", columns: ["name", "isinactive"] });
    var results = srch.run().getRange({ start: 0, end: 1000 });
    for (var i = 0; i < results.length; i++) {
      data.push({
        id: results[i].id,
        name: results[i].getValue("name"),
        isinactive: results[i].getValue("isinactive"),
      });
    }
    return data;
  }

  function getContactos() {
    var data = [];
    var srch = search.create({ type: "customlist_mc_contacto", columns: ["name", "isinactive"] });
    var results = srch.run().getRange({ start: 0, end: 1000 });
    for (var i = 0; i < results.length; i++) {
      data.push({
        id: results[i].id,
        name: results[i].getValue("name"),
        isinactive: results[i].getValue("isinactive"),
      });
    }
    return data;
  }

  function _get(context) {
    try {
      switch (context.list) {
        case "territorios":
          return JSON.stringify(getTerritorios());
        case "enfoques":
          return JSON.stringify(getEnfoques());
        case "industrias":
          return JSON.stringify(getIndustrias());
        case "cantidadempleados":
          return JSON.stringify(getCantidadEmpleados());
        case "subsidiarias":
          return JSON.stringify(getSubsidiarias());
        case "clientes":
          return JSON.stringify(getClientes());
        case "contactos":
          return JSON.stringify(getContactos());
        default:
          throw error.create({
            name: "INVALID_LIST",
            message: "Unsupported list: " + context.list,
          });
      }
    } catch (e) {
      return JSON.stringify({ id: 0, error: e.message });
    }
  }

  function createSolicitud(data) {
  
    doValidation(
      [
        data.territorio,
        data.enfoque,
        data.industria,
        data.cantidadEmpleados,
        data.subsidiaria,
        data.cliente,
        data.contacto,
        data.razonSocial,
        data.representante,
        data.personaFisicaJuridica,
        data.cedula,
        data.direccion,
      ],
      [
        "territorio",
        "enfoque",
        "industria",
        "cantidadEmpleados",
        "subsidiaria",
        "cliente",
        "contacto",
        "razonSocial",
        "representante",
        "personaFisicaJuridica",
        "cedula",
        "direccion",
      ],
      "POST"
    );

    var rec = record.create({
      type: record.Type.PROSPECT,
      isDynamic: true,
    });

    // Info Personal
    rec.setValue({ fieldId: "territory", value: data.territorio });
    rec.setValue({ fieldId: "custentity_mc_enfoque", value: data.enfoque });
    rec.setValue({ fieldId: "custentity_mc_industria", value: data.industria });
    rec.setValue({
      fieldId: "custentity_mc_cantidad_empleados",
      value: data.cantidadEmpleados,
    });
    rec.setValue({ fieldId: "custentity_mc_subsidiaria", value: data.subsidiaria });
    rec.setValue({ fieldId: "custentity_mc_cliente", value: data.cliente });
    rec.setValue({ fieldId: "custentity_mc_contacto", value: data.contacto });

    // Datos Generales
    rec.setValue({ fieldId: "custentity_mc_razon_social", value: data.razonSocial });
    rec.setValue({ fieldId: "custentity_mc_representante", value: data.representante });
    rec.setValue(
      { fieldId: "custentity_mc_personafisica_juridica", value: data.personaFisicaJuridica }
    );
    rec.setValue({ fieldId: "custentity_numero_id", value: data.cedula });
    rec.setValue({ fieldId: "defaultaddress", value: data.direccion });

    
    if (data.entitystatus) {
      rec.setValue({ fieldId: "entitystatus", value: data.entitystatus });
    }

    var id = rec.save({ ignoreMandatoryFields: true });
    return { id: id, message: "Prospecto creado correctamente" };
  }

  function _delete(context) {
    doValidation([context.recordtype, context.id], ["recordtype", "id"], "DELETE");
    record.delete({ type: context.recordtype, id: context.id });
    return JSON.stringify({ id: context.id, message: "Registro eliminado" });
  }

  function _put(context) {
    doValidation([context.recordtype, context.id], ["recordtype", "id"], "PUT");
    var rec = record.load({
      type: context.recordtype,
      id: context.id,
      isDynamic: false,
    });
    for (var fld in context) {
      if (context.hasOwnProperty(fld) && fld !== "recordtype" && fld !== "id") {
        rec.setValue({ fieldId: fld, value: context[fld] });
      }
    }
    rec.save({ ignoreMandatoryFields: true });
    return JSON.stringify({ id: context.id, message: "Registro actualizado" });
  }

  function _post(context) {
    try {
      var result = createSolicitud(context);
      return JSON.stringify(result);
    } catch (e) {
      return JSON.stringify({ id: 0, error: e.message });
    }
  }

  return {
    get: _get,
    post: _post,
    delete: _delete,
    put: _put,
  };
});
