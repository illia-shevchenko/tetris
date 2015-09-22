/**
 * Created by Illia_Shevchenko on 17.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/


//TODO: Add tests for canceling
define(['fake-xmlhttprequest', 'bluebird', 'components/http'], function (fakeXMLHttpRequest, Promise, http) {
    describe('http', function () {
        var nativeXMLHttpRequest = window.XMLHttpRequest;

        beforeAll(function () {
            window.XMLHttpRequest = fakeXMLHttpRequest;
        });

        function testSuit(func, options) {
            describe('Create and open', function () {
                var xhr,
                    promise;

                beforeAll(function () {
                    promise = func();
                    xhr = fakeXMLHttpRequest.requests[0];
                });

                it('should create XMLHttpRequest', function () {
                    expect(fakeXMLHttpRequest.requests.length).toBe(1);
                    expect(fakeXMLHttpRequest.requests).toContain(jasmine.any(fakeXMLHttpRequest));
                });

                it('should create XMLHttpRequest with proper METHOD', function () {
                    expect(xhr.method).toBe(options.method);
                });

                it('should create XMLHttpRequest with proper URL', function () {
                    expect(xhr.url).toBe(options.url);
                });

                it('should create XMLHttpRequest with proper USER and PASSWORD', function () {
                    expect(xhr.username).toBe(options.user);
                    expect(xhr.password).toBe(options.password);
                });

                it('should create ASYNC XMLHttpRequest', function () {
                    expect(xhr.async).toBe(true);
                });

                it('should set request headers', function () {
                    expect(xhr.requestHeaders).toEqual(jasmine.objectContaining(options.headers));
                });

                it('should return promise', function () {
                    expect(promise).toEqual(jasmine.any(Promise));
                });
            });

            describe('Success', function () {
                var result;

                beforeAll(function (done) {
                    var xhr;

                    func().then(function (data) {
                        result = data;
                        done();
                    });

                    xhr = fakeXMLHttpRequest.requests[0];
                    xhr.respond(200, {}, '{"serverSays": "This is a pretty cool response"}');
                });

                it('should resolve promise with data object', function () {
                    expect(result).toEqual(jasmine.any(Object));
                });

                it('should contain the response', function () {
                    expect(result.response).toEqual({
                        serverSays: 'This is a pretty cool response'
                    });
                });

                it('should contain correct status', function () {
                    expect(result.status).toBe(200);
                });

                it('should contain correct statusText', function () {
                    expect(result.statusText).toBe('OK');
                });

                it('should contain request', function () {
                    expect(result.request).toEqual(options);
                });
            });


            describe('Fail', function () {
                var result;

                beforeAll(function (done) {
                    var xhr;

                    func().catch(function (data) {
                        result = data;
                        done();
                    });

                    xhr = fakeXMLHttpRequest.requests[0];
                    xhr.respondError(404, {}, 'bad url');
                });

                it('should reject promise with data object', function () {
                    expect(result).toEqual(jasmine.any(Object));
                });

                it('should contain the response', function () {
                    expect(result.response).toEqual('bad url');
                });

                it('should contain correct status', function () {
                    expect(result.status).toBe(404);
                });

                it('should contain correct statusText', function () {
                    expect(result.statusText).toBe('Not Found');
                });

                it('should contain request', function () {
                    expect(result.request).toEqual(options);
                });
            });


            describe('Success with failed http status', function () {
                var result;

                beforeAll(function (done) {
                    var xhr;

                    func().catch(function (data) {
                        result = data;
                        done();
                    });

                    xhr = fakeXMLHttpRequest.requests[0];
                    xhr.respond(500, {}, 'error');
                });

                it('should reject promise with data object', function () {
                    expect(result).toEqual(jasmine.any(Object));
                });

                it('should contain the response', function () {
                    expect(result.response).toEqual('error');
                });

                it('should contain correct status', function () {
                    expect(result.status).toBe(500);
                });

                it('should contain correct statusText', function () {
                    expect(result.statusText).toBe('Internal Server Error');
                });

                it('should contain request', function () {
                    expect(result.request).toEqual(options);
                });
            });

            afterEach(function () {
                fakeXMLHttpRequest.clearRequests();
            });
        }

        describe('Factory', function () {
            var headers = { //text/plain;charset=utf-8
                    'Cache-Control': 'no-cache',
                    Authorization : 'Basic Some_string'
                },
                settings = {
                    url     : 'http://example.com',
                    method  : 'GET',
                    user    : 'test',
                    password: 'fake',
                    headers : headers
                },
                func = http.bind(http, settings);

            testSuit(func, {
                url     : 'http://example.com',
                method  : 'GET',
                user    : 'test',
                password: 'fake',
                headers : headers
            });
        });

        describe('Shortcut methods', function () {
            function testShortcut(name, data) {
                var url  = 'http://example.com/' + name,
                    headers = {
                        'Cache-Control': 'no-cache',
                        Authorization : 'Basic Some_string_' + name
                    },
                    config = {
                        headers: headers
                    },
                    func = http[name].bind(http, url, data || config, {
                        headers: headers
                    });

                testSuit(func, {
                    url    : url,
                    method : name.toUpperCase(),
                    data   : data || null,
                    headers: headers
                });
            }

            describe('GET', function () { testShortcut('get'); });
            describe('DELETE', function () { testShortcut('delete'); });
            describe('HEAD', function () { testShortcut('head'); });
            describe('POST', function () { testShortcut('post', { test: 'fake' }); });
            describe('PUT', function () { testShortcut('put', { test: 'fake' }); });
        });

        afterAll(function () {
            window.XMLHttpRequest = nativeXMLHttpRequest;
        });
    });
});