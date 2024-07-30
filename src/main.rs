use std::collections::HashMap;

use actix_web::{get, web, App, HttpServer, Responder};
use serde::Deserialize;

#[get("/hello/{name}")]
async fn greet(name: web::Path<String>) -> impl Responder {
    format!("Hello {}!", name)
}

#[derive(Debug, Deserialize)]
struct QueryParams {
    pub object_param: HashMap<String, String>,
    pub array_param: Vec<String>,
}

async fn query_params_handler(query: web::Query<QueryParams>) -> impl Responder {
    format!("Query Params: {:?}", query)
}

#[actix_web::main] // or #[tokio::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(greet)
            .service(web::resource("/params").route(web::get().to(query_params_handler)))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
