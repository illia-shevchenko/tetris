/**
 * Created by Illia_Shevchenko on 17.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/


define(['fake-xmlhttprequest', 'components/http'], function (fakeXMLHttpRequest, http) {
    describe('http', function () {
        var nativeXMLHttpRequest = window.XMLHttpRequest;

        beforeAll(function () {
            window.XMLHttpRequest = fakeXMLHttpRequest;
        });

        function testSuit(func, mehod, url, username, password) {
            var xhr;

            beforeAll(function () {
                func();
                xhr = fakeXMLHttpRequest.requests[0];
            });

            it('should create XMLHttpRequest', function () {
                expect(fakeXMLHttpRequest.requests.length).toBe(1);
                expect(fakeXMLHttpRequest.requests).toContain(jasmine.any(fakeXMLHttpRequest));
            });

            it('should create XMLHttpRequest with proper METHOD', function () {
                expect(xhr.method).toBe(mehod);
            });

            it('should create XMLHttpRequest with proper URL', function () {
                expect(xhr.url).toBe(url);
            });

            it('should create XMLHttpRequest with proper USER and PASSWORD', function () {
                expect(xhr.username).toBe(username);
                expect(xhr.password).toBe(password);
            });

            it('should create ASYNC XMLHttpRequest', function () {
                expect(xhr.async).toBe(true);
            });

            afterAll(function () {
                fakeXMLHttpRequest.clearRequests();
            });
        }

        describe('create and open', function () {
            var func = http.bind(http, {
                    url     : 'http://example.com',
                    method  : 'GET',
                    user    : 'test',
                    password: 'fake'
                });

            testSuit(func, 'GET', 'http://example.com', 'test', 'fake');
        });

        describe('shortcut methods', function () {
            function testShortcut(name, data) {
                var url  = 'http://example.com/' + name,
                    func = http[name].bind(http, url, data);

                testSuit(func, name.toUpperCase(), url);
            }

            describe('get', function () { testShortcut('get'); });
            describe('delete', function () { testShortcut('delete'); });
            describe('head', function () { testShortcut('head'); });
            describe('post', function () { testShortcut('post', { test: 'fake' }); });
            describe('put', function () { testShortcut('put', { test: 'fake' }); });
        });

        afterAll(function () {
            window.XMLHttpRequest = nativeXMLHttpRequest;
        });
    });
});