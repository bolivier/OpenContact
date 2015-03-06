# Open Contact

An app meant to handle simple contact information

## Spec:

### Mongo Schema

```
person: {
    name: string,
    email: string,
    address: string,
    phone: string,
    notes: [ {
        dateCreated: date,
        text: string
    }]
}

organization: {
    name: string,
    address: string,
    phone: string,
    email: string,
    people: [personId],
    years: [numbers]
}
```

### RESTful endpoints

#### People
* `GET /people` lists all the people 
* `POST /people` create a new person from the body
* `DELETE /people/:id` delete the person with ID
* `PUT /people/:id` update person with new fields in body

#### Organizations
* `GET /orgs` lists all the organizations
* `POST /orgs` create a new org from the body
* `DELETE /orgs/:id` delete the org with ID
* `PUT /orgs/:id` update org with new fields in body
* `GET /orgs/:id/people` list the people associated with the org
* `POST /orgs/:id/people` add the people with ids specified in the body to the org
* `DELETE /orgs/:id/people` delete the people with ids specified in the body from the org

#### Export
* `GET /export/dump/:year` returns a csv for the year with all the people involved 
