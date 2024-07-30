use std::collections::HashMap;

use axum::{
    extract::{Path, Query},
    routing::get,
    Router,
};
use serde::Deserialize;

async fn greet(Path(name): Path<String>) -> String {
    format!("Hello {}!", name)
}

async fn query_params_handler(query: Query<QueryParams>) -> String {
    format!("Query Params: {:?}", query)
}

#[derive(Debug, Deserialize)]
struct QueryParams {
    pub object_param: HashMap<String, String>,
    pub array_param: Vec<String>,
}

#[tokio::main]
async fn main() {
    // build our application with a route
    let app = Router::new()
        .route("/hello/:name", get(greet))
        .route("/params", get(query_params_handler));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("localhost:8080")
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}
