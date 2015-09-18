/**
 * Created by Illia_Shevchenko on 17.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/


define(['fake-xmlhttprequest', 'components/http'], function (fakeXMLHttpRequest, http) {
    describe('http', function () {
        var nativeXMLHttpRequest = window.XMLHttpRequest;

        beforeEach(function () {
            window.XMLHttpRequest = fakeXMLHttpRequest;
        });

        afterEach(function () {
            window.XMLHttpRequest = nativeXMLHttpRequest;
        });

        it('should call fake', function () {
            http.get('http://beta.json-generator.com/api/json/get/Vk2YRnXA')
                .then(function (data) {
                    console.log(data);
                });
        });
    });
});