/**
 * providers file for api calls
 */
export class Api {
    /**
     * getApi function for calling the http get request
     * @param {*} url: url for which the get api to be called
     */
    getApi(url) {
        return fetch(url, {
            method: 'GET',
        }).then(response => {
            return response.json().then(resp => {
                return resp;
            }).catch(err => {
                window.alert('Invalid asteroid ID');
                return false;
            });
        }).catch(error => {
            return error;
        });
    }
}
