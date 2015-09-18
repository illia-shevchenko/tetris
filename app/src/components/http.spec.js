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


        describe('create and open', function () {
            var xhr;

            beforeEach(function () {
                http({
                    url     : 'http://example.com',
                    method  : 'GET',
                    user    : 'test',
                    password: 'fake'
                });

                xhr = fakeXMLHttpRequest.requests[0];
            });

            afterEach(function () {
                fakeXMLHttpRequest.clearRequests();
            });

            it('should create XMLHttpRequest', function () {
                expect(fakeXMLHttpRequest.requests.length).toBe(1);

                expect(fakeXMLHttpRequest.requests).toContain(jasmine.any(fakeXMLHttpRequest));
            });

            it('should create XMLHttpRequest with proper METHOD', function () {
                expect(xhr.method).toBe('GET');
            });

            it('should create XMLHttpRequest with proper URL', function () {
                expect(xhr.url).toBe('http://example.com');
            });

            it('should create XMLHttpRequest with proper USER and PASSWORD', function () {
                expect(xhr.username).toBe('test');
                expect(xhr.password).toBe('fake');
            });

            it('should create ASYNC XMLHttpRequest', function () {
                expect(xhr.async).toBe(true);
            });
        });
    });
});