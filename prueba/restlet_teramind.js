/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 */
define([
    "N/record",
    "N/error",
    "N/search",
    "N/format"
], function(record, error, search, format) {


    function doValidation(args, argNames, methodName) {
        for (var i = 0; i < args.length; i++) {
            if (args[i] === null || args[i] === undefined) {
                throw error.create({
                    name: 'MISSING_REQ_ARG',
                    message: 'Missing argument [' + argNames[i] + '] for ' + methodName
                });
            }
        }
    }

    function createProspect(data) {
        
        doValidation(
            [data.territorio, data.enfoque, data.industria, data.cantidadEmpleados,
             data.subsidiaria, data.cliente, data.contacto, data.razonSocial,
             data.representante, data.personaFisicaJuridica, data.cedula, data.direccion],
            ['territorio','enfoque','industria','cantidadEmpleados',
             'subsidiaria','cliente','contacto','razonSocial',
             'representante','personaFisicaJuridica','cedula','direccion'],
            'POST /prospectos'
        );

        var rec = record.create({ type: record.Type.PROSPECT, isDynamic: true });
        var prospectFormId = 112; 
        rec.setValue({ fieldId: 'Custom Lead Form - MR', value: prospectFormId });

        // Personal Info
        rec.setValue({ fieldId: 'territory',                            value: data.territorio });
        rec.setValue({ fieldId: 'custentity_mc_enfoque',                  value: data.enfoque });
        rec.setValue({ fieldId: 'custentity_mc_industria',                value: data.industria });
        rec.setValue({ fieldId: 'custentity_mc_cantidad_empleados',       value: data.cantidadEmpleados });
        rec.setValue({ fieldId: 'custentity_mc_subsidiaria',              value: data.subsidiaria });
        rec.setValue({ fieldId: 'custentity_mc_cliente',                  value: data.cliente });
        rec.setValue({ fieldId: 'custentity_mc_contacto',                 value: data.contacto });

        // General Data
        rec.setValue({ fieldId: 'custentity_mc_razon_social',             value: data.razonSocial });
        rec.setValue({ fieldId: 'custentity_mc_representante',            value: data.representante });
        rec.setValue({ fieldId: 'custentity_mc_personafisica_juridica',   value: data.personaFisicaJuridica });
        rec.setValue({ fieldId: 'custentity_numero_id',                   value: data.cedula });
        rec.setValue({ fieldId: 'defaultaddress',                         value: data.direccion });


        var id = rec.save({ ignoreMandatoryFields: true });
        return { id: id, message: 'Prospecto creado correctamente' };
    }

    
    function createCustomer(data) {
        doValidation([data.entitystatus], ['entitystatus'], 'POST /customers');
        var rec = record.create({ type: record.Type.CUSTOMER, isDynamic: true });
        rec.setValue({ fieldId: 'entitystatus', value: data.entitystatus });

        var id = rec.save({ ignoreMandatoryFields: true });
        return { id: id, message: 'Cliente creado correctamente' };
    }

    function createLead(data) {
        var rec = record.create({ type: record.Type.LEAD, isDynamic: true });
    
        var id = rec.save({ ignoreMandatoryFields: true });
        return { id: id, message: 'Lead creado correctamente' };
    }

    function _get(context) {
        switch (context.list) {
            case 'territorios':       return JSON.stringify(getTerritorios());
            case 'enfoques':          return JSON.stringify(getEnfoques());
            case 'industrias':        return JSON.stringify(getIndustrias());
            case 'cantidadempleados': return JSON.stringify(getCantidadEmpleados());
            case 'subsidiarias':      return JSON.stringify(getSubsidiarias());
            case 'clientes':          return JSON.stringify(getClientes());
            case 'contactos':         return JSON.stringify(getContactos());
            default:
                throw error.create({ name: 'INVALID_LIST', message: 'Unsupported list: ' + context.list });
        }
    }

    
    function _post(context) {
        try {
            switch (context.recordtype) {
                case 'prospectos': return JSON.stringify(createProspect(context));
                case 'customers':  return JSON.stringify(createCustomer(context));
                case 'leads':      return JSON.stringify(createLead(context));
                default:
                    throw error.create({ name: 'INVALID_TYPE', message: 'Tipo no soportado: ' + context.recordtype });
            }
        } catch (e) {
            return JSON.stringify({ id: 0, error: e.message });
        }
    }


    function _delete(context) {
        doValidation([context.recordtype, context.id], ['recordtype','id'], 'DELETE');
        record.delete({ type: context.recordtype, id: context.id });
        return JSON.stringify({ id: context.id, message: 'Registro eliminado' });
    }

    function _put(context) {
        doValidation([context.recordtype, context.id], ['recordtype','id'], 'PUT');
        var rec = record.load({ type: context.recordtype, id: context.id, isDynamic: false });
        for (var fld in context) {
            if (context.hasOwnProperty(fld) && fld !== 'recordtype' && fld !== 'id') {
                rec.setValue({ fieldId: fld, value: context[fld] });
            }
        }
        rec.save({ ignoreMandatoryFields: true });
        return JSON.stringify({ id: context.id, message: 'Registro actualizado' });
    }

    return {
        get:    _get,
        post:   _post,
        delete: _delete,
        put:    _put
    };
});
