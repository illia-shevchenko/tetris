/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/
/*global request, testEnd*///see helpers/

describe('GAME api', () => {
   /* describe('POST api/game', () => {
        it('should create new Game document', done => {
            let game = {
                    nextFigure: {
                        left  : 1,
                        top   : 1,
                        width : 1,
                        points: [1]
                    },
                    figure: {
                        left  : 2,
                        top   : 2,
                        width : 2,
                        points: [2, 2]
                    },
                    field: {
                        left  : 3,
                        top   : 3,
                        width : 3,
                        points: [3, 3, 3]
                    },
                    score: 1000,
                    user : 'Some User'
                },
                end = testEnd(done);

            request.post('/api/game')
                .send(game)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return end(err);
                    }

                    expect(res.body).to.containSubset(game);
                    expect(res.body._id).to.be.a('string');
                    end();
                });
        });
    });*/
    
    
    //describe('GET api/game/:q', () => {
    //    it('should returns 200 OK and list of games', done => {
    //        request.get('/api/game/search_string')
    //            .expect(200, 'Here your list: search_string')
    //            .end(testEnd(done));
    //    });
    //});
});
