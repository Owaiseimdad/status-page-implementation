db.createUser({
    user: 'status_page_user',
    pwd: 'status_page_password',
    roles: [
        {
            role: 'readWrite',
            db: 'status_page_db'
        }
    ]
});

db = db.getSiblingDB('status_page_db');

db.createCollection('status_updates');
db.createCollection('applications');

db.status_updates.createIndex({ "created_at": 1 });
db.status_updates.createIndex({ "application": 1 });
db.applications.createIndex({ "name": 1 }, { unique: true });