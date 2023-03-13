import dotenv from 'dotenv';

const express = require('express');
dotenv.config();

const Pool = require('pg').Pool;
const pool = new Pool({
    host:'localhost',
    user:'postgres',
    password:'73936060',
    port:5432,
    database: 'HR'
})

const app = express()
app.use(express.json())
const port = process.env.PORT || 3005

app.listen(port,()=> console.log(`Server listening on port ${port}`))

//region
app.get('/api/region',(req,res)=> {
    pool.query('select *  from regions',
    [],
    (error,result)=>{
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})


app.get('/api/region/:region_id',(req,res)=>{
    const {region_id} = req.params;
    pool.query('select * from regions where region_id = $1',[region_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        
        res.status(200).json(result.rows)
    })
})


app.post('/api/region/',(req,res)=> {
    const {region_name} = req.body;
    responseReturn = new ResponseClass();
    pool.query('insert into regions (region_name) values ($1)',[region_name],
    (error,result)=> { 
        if (error) {
            throw error
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/region/:region_id',(req,res)=> {
    const {region_id} = req.params;
    const {region_name} = req.body;

    pool.query('update regions set region_name = $1 where region_id = $2',[region_name,region_id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil update')
    })
})

app.delete('/api/region/:region_id',(req,res)=> {
    const {region_id} = req.params

    pool.query('delete from regions where region_id = $1',[region_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil dihapus')
    })
})



//country
app.get('/api/country',(req,res)=> {
    pool.query('select *  from countries',
    [],
    (error,result)=>{
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})


app.get('/api/country/:country_id',(req,res)=>{
    const {country_id} = req.params
    pool.query('select * from countries where country_id = $1',[country_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/country/',(req,res)=> {
    const {country_name} = req.body;
    const {country_id} = req.body;
    const {region_id} = req.body;
    pool.query('insert into countries (country_name,region_id,country_id) values ($1,$2,$3)',[country_name,region_id,country_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/country/:country_id',(req,res)=> {
    const {country_id} = req.body
    const {country_name} = req.body
    const {region_id} = req.body
    pool.query('update countries set country_name = $1, region_id = $2 where country_id = $3',
    [country_name,region_id,country_id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil update')
    })
})

app.delete('/api/country/:country_id',(req,res)=> {
    const {country_id} = req.body

    pool.query('delete from countries where country_id = $1',[country_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil dihapus')
    })
})


//location
app.get('/api/location',(req,res)=> {
    pool.query('select *  from locations',
    [],
    (error,result)=>{
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})


app.get('/api/location/:location_id',(req,res)=>{
    const {location_id} = req.params
    pool.query('select * from locations where location_id = $1',[location_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/location/',(req,res)=> {
    const {street_address} = req.body
    const {postal_code} = req.body
    const {city} = req.body
    const {state_province} = req.body
    const {country_id} = req.body
    pool.query('insert into locations (street_address, postal_code,city,state_province,country_id) values ($1,$2,$3,$4,$5)',
    [street_address,postal_code,city,state_province,country_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/location/:location_id',(req,res)=> {
    const {location_id} = req.params
    const {street_address} = req.body
    const {postal_code} = req.body
    const {city} = req.body
    const {state_province} = req.body
    const {country_id} = req.body
    pool.query('update locations set street_address = $1, postal_code = $2, city = $3, state_province = $4, country_id = $5 where location_id = $6',
    [street_address,postal_code,city,state_province,country_id,location_id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil update')
    })
})

app.delete('/api/location/:location_id',(req,res)=> {
    const {location_id} = req.params

    pool.query('delete from locations where location_id = $1',[location_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil dihapus')
    })
})

//department
app.get('/api/department',(req,res)=> {
    pool.query('select *  from departments',
    [],
    (error,result)=>{
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})


app.get('/api/department/:department_id',(req,res)=>{
    const {department_id} = req.params
    pool.query('select * from departments where department_id = $1',[department_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/department/',(req,res)=> {
    const {department_name} = req.body;
    const {location_id} = req.body;
    pool.query('insert into departments (department_name,location_id) values ($1,$2)',[department_name,location_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/department/:department_id',(req,res)=> {
    const {dapertment_id} = req.params;
    const {department_name} = req.body;
    const {location_id} = req.body;

    pool.query('update departments set department_name = $1, location_id = $2 where department_id = $3',
[department_name,location_id,dapertment_id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil update')
    })
})

app.delete('/api/department/:department_id',(req,res)=> {
    const {department_id} = req.params

    pool.query('delete from departments where department_id = $1',[department_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil dihapus')
    })
})

//employee
app.get('/api/employee',(req,res)=> {
    pool.query('select *  from employees',
    [],
    (error,result)=>{
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})


app.get('/api/employee/:employee_id',(req,res)=>{
    const {employee_id} = req.params
    pool.query('select * from employees where employee_id = $1',[employee_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/employee/',(req,res)=> {
    const {first_name} = req.body;
    const {last_name} = req.body;
    const {email} = req.body;
    const {phone_number} = req.body;
    const {hire_date} = req.body;
    const {job_id} = req.body;
    const {salary} = req.body;
    const {commission_pct} = req.body;
    const {manager_id} = req.body;
    const {department_id} = req.body;
    pool.query('insert into employees (first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
    [first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/employee/:employee_id',(req,res)=> {
    const {employee_id} = req.params
    const {first_name} = req.body
    const {last_name} = req.body
    const {email} = req.body
    const {phone_number} = req.body
    const {hire_date} = req.body
    const {job_id} = req.body
    const {salary} = req.body
    const {commission_pct} = req.body
    const {manager_id} = req.body
    const {department_id} = req.body

    pool.query('update employees set first_name = $1, last_name = $2, email = $3, phone_number = $4, hire_date = $5, job_id = $6, salary = $7, commission_pct = $8, manager_id = $9, department_id = $10 where employee_id = $11',
    [first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id,employee_id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil update')
    })
})

app.delete('/api/employee/:employee_id',(req,res)=> {
    const {employee_id} = req.params

    pool.query('delete from employees where employee_id = $1',[employee_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil dihapus')
    })
})

//job-hostory
app.get('/api/job-history',(req,res)=> {
    pool.query('select *  from job_history',
    [],
    (error,result)=>{
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})


app.get('/api/job-history/:employee_id',(req,res)=>{
    const {employee_id} = req.params
    pool.query('select * from job_history where employee_id = $1',[employee_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/job-history/',(req,res)=> {
    const {start_date} = req.body;
    const {end_date} = req.body;
    const {job_id} = req.par;
    const {department_id} = req.body;
    pool.query('insert into job_history (start_date,end_date,job_id,department_id) values ($1,$2,$3,$4)',
    [start_date,end_date,job_id,department_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/job-history/:employee_id',(req,res)=> {
    const {employee_id} = req.params
    const {start_date} = req.body
    const {end_date} = req.body
    const {job_id} = req.body
    const {department_id} = req.body

    pool.query('update job_history set start_date = $1, end_date = $2, job_id = $3, department_id = $4 where employee_id = $5',
    [start_date,end_date,job_id,department_id,employee_id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil update')
    })
})

app.delete('/api/job-history/:employee_id',(req,res)=> {
    const {employee_id} = req.params

    pool.query('delete from job_history where employee_id = $1',[employee_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil dihapus')
    })
})

//jobs
app.get('/api/job',(req,res)=> {
    pool.query('select *  from jobs',
    [],
    (error,result)=>{
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})


app.get('/api/job/:job_id',(req,res)=>{
    const {job_id} = req.params
    pool.query('select * from jobs where job_id = $1',[job_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/job/',(req,res)=> {
    const {job_id} = req.body;
    const {job_title} = req.body;
    const {min_salary} = req.body;
    const {max_salary} = req.body;

    pool.query('insert into jobs (job_title,min_salary,max_salary,job_id) values ($1,$2,$3,$4)',[job_title,min_salary,max_salary,job_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/job/:job_id',(req,res)=> {
   const {job_id} = req.body;
    const {job_title} = req.body;
    const {min_salary} = req.body;
    const {max_salary} = req.body;

    pool.query('update jobs set job_title = $1, min_salary = $2, max_salary = $3 where job_id = $4',
    [job_title,min_salary,max_salary,job_id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil update')
    })
})

app.delete('/api/job/:job_id',(req,res)=> {
    const {job_id} = req.params

    pool.query('delete from jobs where job_id = $1',[job_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil dihapus')
    })
})