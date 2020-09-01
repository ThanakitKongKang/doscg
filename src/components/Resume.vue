<template>
  <div
    class="resume"
    id="resume1"
  >
    <div class="row text-center">
      <span class="name position center">{{person.name.first}} {{person.name.last}}</span>
    </div>
    <div class="row text-center">
      <p class="position center">{{person.position}} at KBTG</p>
    </div>
    <div class="row">
      <div class="image center">
        <div class="img"></div>
      </div>
    </div>
    <div class="row">
      <div class="about center">{{person.about}}</div>
    </div>
    <div class="left half">
      <div class="experience">
        <h3>Experience</h3>
        <div
          class="experience-block"
          v-for="experience in person.experience"
          :key="experience.company"
        >
          <span class="company"> {{experience.company}} </span>
          <span class="job-title"> {{experience.position}} </span>
          <span class="time-period"> {{experience.timeperiod}}</span>
          <span class="job-description"> {{experience.description}} </span>
        </div>
      </div>
      <div class="contact">
        <h3>Contact</h3>
        <table>
          <tr>
            <td><i
                class="fa fa-envelope"
                aria-hidden="true"
              ></i></td>
            <td>thanakit@kkumail.com</td>
          </tr>
          <tr>
            <td><i
                class="fa fa-phone"
                aria-hidden="true"
              ></i></td>
            <td>082-573-5896</td>
          </tr>
          <tr v-if="person.contact.github">
            <td><i
                class="fa fa-github"
                aria-hidden="true"
              ></i></td>
            <td><a :href="person.contactLinks.github">contactLinks.github</a></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="right half">
      <div class="education">
        <h3>Education</h3>
        <div class="education-block">
          <span class="degree">Bachelor of Science</span>
          <span class="degree-description">Major in Computer Science, Khon Kaen University</span>
        </div>
      </div>
      <div class="skills-block">
        <h3 class="skills-title">Skills</h3>
        <div class="skills">
          <div
            class="skill"
            v-for="skill in person.skills"
            :key="skill.name"
          >
            <span class="skill-name">{{skill.name}}</span>
          </div>
        </div>
        <span class="skills-other"> {{person.knowledge}} </span>
      </div>

      <span class="skills-other"> {{person.skillDescription}} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resume',
  data () {
    return {
      title: 'Resume',
      person: {
        name: {
          first: 'Thanakit',
          last: 'Chamkromwattanakool'
        },
        about: 'Experienced Software Engineer with a demonstrated history of working in the information technology and services industry. Skilled in React.js, Spring Boot, PHP, Java and SQL. Strong engineering professional with a Bachelor\'s degree focused in Computer Science from Khon Kaen University',
        position: 'Software Engineer',
        experience: [
          {
            company: 'Kasikorn Business-Technology Group',
            position: 'Software Engineer',
            timeperiod: 'since June 2020',
            description: 'Fulfillment of important tasks in Debt-Burden Service team',
            website: 'https://www.kbtg.tech'
          },
          {
            company: 'Phon Hospital',
            position: 'Developer, IT Support',
            timeperiod: 'June 2019 - July 2019',
            description: 'Developed Herb retailer management, supported IT tasks'
          }
        ],
        contact: {
          github: 'ThanakitKongKang'
        },
        contactLinks: {
          github: 'https://github.com/ThanakitKongKang'
        },
        skills: [

          {
            name: 'VueJS'
          },

          {
            name: 'JAVA'
          },
          {
            name: 'ReactJS'
          },
          {
            name: 'Node.js'
          },
          {
            name: 'Java Script'
          },
          {
            name: 'PHP'
          },
          {
            name: 'CSS'
          },
          {
            name: 'Rest API'
          },
          {
            name: 'Spring Boot'
          },
          {
            name: 'Git'
          },
          {
            name: 'Bootstrap'
          },
          {
            name: 'Ant Design'
          }
        ]
      }
    }
  },
  async mounted () {
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#resume1 {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 20px;
  padding-bottom: 50px;
  direction: rtl;
  max-width: 55rem;
  margin-left: auto;
  margin-right: auto;
}
#resume1 a,
#resume1 a:focus,
#resume1 a:hover,
#resume1 a:visited {
  color: #616161;
}
#resume1 h3 {
  margin-bottom: 0;
}
#resume1 span {
  display: inline-block;
}
#resume1 .row {
  width: 100%;
}
#resume1 .half {
  width: 44%;
}
#resume1 .half.left {
  float: left;
  text-align: right;
  padding-left: 4%;
  padding-right: 2%;
}
#resume1 .half.right {
  float: right;
  text-align: right;
  padding-right: 4%;
  padding-left: 2%;
}
#resume1 .center {
  margin-left: auto;
  margin-right: auto;
}
#resume1 .text-center {
  text-align: center;
}
#resume1 span.name {
  border: 1px solid black;
  text-transform: uppercase;
  padding: 10px 20px;
  margin-top: 80px;
  margin-bottom: 5px;
  font-family: "Open Sans", sans-serif;
  font-size: 35px;
  font-weight: 600;
  letter-spacing: 5px;
  overflow-wrap: anywhere;
}
#resume1 .position {
  text-transform: uppercase;
  font-family: "Open Sans", sans-serif;
  font-size: smaller;
  color: #757575;
  margin-bottom: 40px;
}
#resume1 .image {
  width: 100px;
  height: 100px;
  margin-top: 40px;
  margin-bottom: 25px;
}
#resume1 .image .img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: url("../assets/id.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
#resume1 .contact {
  width: 100%;
}
#resume1 .contact table {
  text-align: right;
  float: right;
  margin-top: 5px;
  color: #616161;
  font-size: 20px;
}
#resume1 .contact table i {
  padding: 2px;
  color: #616161;
}
#resume1 .contact table tr td:nth-child(2) {
  vertical-align: top;
}
#resume1 .experience .experience-block {
  margin-bottom: 1rem;
}
#resume1 .experience .experience-block span {
  width: 100%;
  color: #616161;
}
#resume1 .experience .experience-block span.company {
  font-weight: bold;
  padding-bottom: 5px;
  padding-top: 10px;
  color: #424242;
}
#resume1 .experience .experience-block .job-title {
  font-style: italic;
}
#resume1 .experience .experience-block .job-description {
  font-size: 0.9rem;
}
#resume1 .education-block span {
  color: #616161;
}
#resume1 .education-block span.degree {
  font-weight: bold;
  padding-bottom: 5px;
  padding-top: 10px;
  color: #424242;
}

.skills-block {
  margin-top: 50px;
  position: relative;
}
.skills-block .skills-title {
  margin-bottom: 1rem !important;
}

.skills-block .skills {
  margin-bottom: 10px;
  margin-bottom: 20px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
}
.skills-block .skills .skill {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;
  border: #333333 1px solid;
  margin: 3px;
  float: right;
  font-size: 13px;
}
.skills-block .skills .skill .skill-name {
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
.skills-block .skills .skills-other {
  display: inline-block;
  width: 100%;
  margin-top: 20px;
}
.about {
  width: 50%;
  font-size: 0.8rem;
  margin-bottom: 2rem;
}
</style>
