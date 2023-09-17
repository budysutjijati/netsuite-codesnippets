/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {


            handleEmployee(scriptContext);

        }

        /**
         * Code snippet to get Employee Emergency Contact Sublist Data as per https://www.reddit.com/r/Netsuite/comments/16jmso3/emergency_contact_can_it_be_edited_via_api/
         * @param {*} scriptContext 
         */
        const handleEmployee = (scriptContext) => {

            try {
                if (scriptContext.newRecord.id === 50426) {
                    log.debug('scriptContext.record.id', scriptContext.newRecord.id)

                    const sublistId = 'emergencycontact'; // replace with your sublist ID
                    const sublistFields = scriptContext.newRecord.getSublistFields({
                        sublistId: sublistId
                    });

                    const sublistData = [];

                    for (let i = 0; i < scriptContext.newRecord.getLineCount({sublistId}); i++) {
                        const lineData = {};
                        sublistFields.forEach(function(fieldId) {
                            const fieldValue = scriptContext.newRecord.getSublistValue({
                                sublistId: sublistId,
                                fieldId: fieldId,
                                line: i
                            });
                            lineData[fieldId] = fieldValue;
                        });
                        sublistData.push(lineData);
                    }

                    log.debug('Sublist Data', JSON.stringify(sublistData));

                }

            } catch (e) {
                log.error('error', e);
            }
        }


        return {beforeLoad, beforeSubmit, afterSubmit}
    });