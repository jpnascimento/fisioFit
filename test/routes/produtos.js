/*var http = require('http');
var assert = require('assert');

describe('#Produto Controller', function() {
    it('#Deve listar produtos em JSON', function(done) {
        var configuracoes = {
            hostname: 'localhost',
            port: 3000,
            path: '/produtos',
            headers: { 'Accept': 'application/json' }
        };
    
    http.get(configuracoes, function(res) {
        
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        // assert.equal(res.headers['content-type'], 'text/html; charset=utf-8');
        // assert.equal(res.headers['content-type'], 'application');
        done();
    });
    
    });
});*/

var express = require('../../custom-express')();
var request = require('supertest')(express);

var DatabaseCleaner = require('database-cleaner');

describe('#Produto Controller ->', function() {
    
    // Limpa as tabelas antes dos testes
    function limpaTabelas(done) {
        
        var databaseCleaner = new DatabaseCleaner('mysql');
        databaseCleaner.clean(express.infra.connectionFactory(), done);
    }
    
    //before(limpaTabelas);
    //after(limpaTabelas);
    
    it('#Deve listar produtos em JSON', function(done) {
            
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200, done);
    
    });
    
    it('#Deve listar produtos em HTML', function(done) {
        
        request.get('/produtos')
            .expect('Content-type', /html/)
            .expect(200, done);
    });
    
    it('#Deve cadastrar produto válido', function(done) {
        
        request.post('/produtos')
            .send({ titulo: 'supertest', preco: 29.9, descricao: 'livro de supertest' })
            .expect('Location', '/produtos')
            .expect(302, done);
    });
    
    /*it('#Deve cadastrar produto válido 2', function(done) {
        
        request.post('/produtos')
            .send({ titulo: 'supertest', preco: 29.9, descricao: 'livro de supertest' })
            .expect(302)
            .expect('Location', '/produtos', done);
    });*/
    
    it('#Tenta cadastrar produto inválido', function(done) {
        
        request.post('/produtos')
            .send({ descricao: 'livro de supertest' })
            .expect(400, done);
    });
    
});