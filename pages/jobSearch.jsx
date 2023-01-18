import React, {useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import JobSearchList from '../src/JobSearchList.jsx'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';



const Jobs = ({classes}) => {
 



const [jobs, setJobs] = useState([{
 "name" : "Junior Software Engineer (iOS)",
"company_id" : "Brooksource",
"description" : `As a Junior Software Engineer (iOS) you will be designing, integrating and implementing mobile application software in support of their flagship mobile application. The ideal candidate will possess a passion for clean, well architected code, and can work well in a team environment.
We are currently working on expanding the features and capabilities of our mobile channel while leveraging the latest advances in the mobile platforms to provide best in class mobile experiences to our participants. Be a part of a team that can provide opportunities to learn and grow as you work on mobile apps that meet and exceed industry standards. If you are interested and feel this fits you, please keep reading and apply!

Qualifications:

· Bachelors Degree in Computer Science and Engineering or Software Engineering OR other relevant working or training experience (Training Bootcamp, Military Experience, etc.)

· 1+ years of strong software development project experience

· Experience using Swift or Objective-C highly preferred

· Strong understanding of the agile methodology

· Driven, hard-working personality

Responsibilities:

· Participate in the full lifecycle of iOS based apps by using Swift, SwiftUI, and XCode

· Contribute to the implementation of component libraries and new features

· Work closely with the API team to define and consume API services for the apps

· Participate in regular code reviews and open team communication

· Work in agile development methodology, including sprint planning and effort estimation

· Build and maintain technical skills in iOS

· Partner with your peers and be mentored by your experienced team members, in various in-house forums and challenge yourself to grow

Whats In It For You?

Opportunity to start your career in an enterprise environment with mentorship and training
Medical, Dental and Vision Health Benefits
Weekly Paychecks
*COVID-19 Vaccination Requirement

Job Type: Full-time

Pay: $70,000.00 - $80,000.00 per year

Benefits:

401(k)
401(k) matching
Dental insurance
Health insurance
Health savings account
Life insurance
Paid time off
Retirement plan
Vision insurance
Schedule:

8 hour shift
Monday to Friday
Ability to commute/relocate:

Iselin, NJ 08830: Reliably commute or planning to relocate before starting work (Required)
Work Location: Hybrid remote in Iselin, NJ 08830

`,
"salary" : "70,000.00 - 80,000.00",

"location" : "Iselin, NJ",

"close_date": "",

"experience_type": "Entry Level",

"employment_type" : "Full Time",

"jobsite" : "Remote"

}, 
{
   
"name" : "Founding Software Engineer",
"company_id" : "Velvet",
"description" : 
`Full Job Description :

About us 

If you've ever been to a concert, club, comedy show, or any other form of live performance, then you know the kind of positive impact it can have on our lives. Live performances have the power to transport us to a different world or time, allowing us to create memories that last a lifetime! What we often don't realize is the amount of time, effort, and energy that goes into organizing such an event. Velvet, a venture backed NYC based pre-seed stage startup, is now looking to build a software that will help ease and streamline the process of taking live performance events from conception to reality and we are looking for founding engineers that can help us get there!

Who we are

Velvet was founded by Andy Martens (CEO) and Jaldeep Acharya (CTO) who both have extensive experience working within the tech industry. Doing a startup was something that was always part of the plan for both of them, and that together with their passion for music brought them together to create Velvet! Andy is a start-up leader with a background in strategic finance and revenue operations. Jaldeep is a product focused technical leader who comes from a background in Computer Science.

Who you are

Are you a product centric engineer who enjoys solving real-life problems? Someone who enjoys being customer focused and building software that'll delight customers? Do you enjoy building software solutions from the ground up, where you get to be a part of everything from feature prioritization to design to development to testing? Are you a team player who thrives in a fast paced collaborative environment? Do you like to challenge yourself and learn new skills? Are you someone with a lot of self-drive who isn't scared to wear a new hat? If so, then please continue reading!

What we would like to offer

As a founding engineer, you'll get to join us on this exciting journey from day 1. You'll be reporting directly to the CTO and you'll get to be part of the core team that shapes the company's tech best practices, processes, culture, and values. You'll get to own and drive development of business critical features end-to-end - that means everything from planning, designing, implementing, testing, to providing production support. You'll get to do full-stack development, interact with customers, and work in an international environment (we plan to have a presence in the US and Sweden). You'll get to operate with a lot of autonomy, where you'll be empowered to be creative, own your successes, and grow from your mistakes. You'll have the power to direct your career, and we'll be there to support you.

Qualifications

Bachelor's or higher degree in Computer Science, or related field.
3+ years of professional software engineering experience.
Experience with AWS/React/Typescript/Git.
Proven track record of shipping excellent software in a timely manner.
Excellent written and verbal communication skills.
Location

We want to give our employees complete flexibility in terms of where they prefer to work from, hence this opportunity is fully-remote within the United States (you'll be expected to work east coast hours in order to enable collaboration with the team in Sweden). There'll be office space available for employees in the NYC-area if you prefer to work from an office. All employees will be expected to make time once a quarter to travel for a few days in order to meet the team in-person.

Compensation and benefits

Base salary of $110K - $180K based on location and experience
Generous equity packages (so that you get to reap the benefits of building this company from the ground up with us!)
Health, Dental, and Vision insurance
4 weeks PTO
4 work-from-anywhere weeks (we truly mean ANYWHERE in the world! All you need is a good internet connection)
Social gatherings (both virtual and in-person)

`,
"salary" : "$110,000 - $180,000",

"location" : "New York, NY",

"close_date": "",

"experience_type": "Entry Level",

"employment_type" : "Full Time",

"jobsite" : "Hybrid"

}, 

])

    return (
      <div>
      <Box height="100vh" display="flex" flexDirection="column"> 
        {/* <form className = "topnav">
      <input
      // value= {questionSearch}
      // onInput ={(e)=> {setQuestionSearch(e.target.value)}}
      type ="text"
      id = 'question-search'
      placeholder = " Search" />
      </form> */}
      <Grid container spacing={2} columns={16} sx={{ m: '5px'}}>
        <Grid item xs={5}>
          <List>
          {jobs.map((job,key) => {return (
            <div key = {key}>
            <JobSearchList job = {job}/>
            </div>
          )
          })}
           </List>
        </Grid>
        <Divider orientation="vertical"  sx={{ m: '18px'}} />
        <Grid item xs={9.8} sx={{ mt: '8px', borderRadius: '16px', bgcolor: '#CFCFCF'}}>
          <Typography variant = "h1">{jobs[1].name}</Typography>
          <Typography variant = "h2">{jobs[1].company_id}</Typography> 
          <br/>
            <Typography style={{ maxHeight: 600, overflow: 'auto', whiteSpace: "pre-wrap" }}>
           {jobs[1].description}
           </Typography>
           <br/>
        <Button variant="contained" size="large" color="secondary">Apply</Button>
        </Grid>
      </Grid>
      </Box>
      </div>

    )

    
  }
  

  export default Jobs;