<template>
  <a-layout>
    <a-layout-header>
<!--      <Header></Header>-->
    </a-layout-header>
    <a-layout-content>
      <div class="container">
<!--        <TAnimation ani="base" style="position: fixed; left: 300px;"></TAnimation>-->
        <div>
          <div class="top-side">
            <a-breadcrumb :style="{fontSize: `24px`}">
              <a-breadcrumb-item style="color:rgb(var(--arcoblue-5)); font-variant: small-caps;"> <icon-copy style="font-size:28; color:rgb(var(--arcoblue-5))"/> Course</a-breadcrumb-item>
            </a-breadcrumb>
            <a-button @click="addVisible=true" type="outline">Add Class</a-button>
          </div>
          <div class="content">
            <a-table :columns="columns" :data="data">
              <template #duration="{ rowIndex }">
                {{data[rowIndex].duration+' h'}}
              </template>
              <template #optional="{ rowIndex }">
                <a-space>
                  <a-button @click="beforeEdit(rowIndex)" type="primary">Edit</a-button>
                  <a-popconfirm content="Do you want to delete the class?" okText="Delete" cancelText="No"
                                @ok="deleteClass(rowIndex)">
                    <a-button>Delete</a-button>
                  </a-popconfirm>
                </a-space>
              </template>
            </a-table>
          </div>
        </div>

        <a-modal v-model:visible="addVisible" :on-before-ok="addClass" okText="Submit" cancelText="Exit" width="800px">
          <template #title>
            Add Class
          </template>
          <div style="display: flex; justify-content: center; padding:20px">
            <a-form ref="formRef" :model="addForm">
              <a-form-item field="name" label="Course Name" :rules="nameRule">
                <a-input v-model="addForm.name" placeholder="please enter your username..."/>
              </a-form-item>
              <a-form-item field="code" label="Course Code" :rules="codeRule">
                <a-input v-model="addForm.code"></a-input>
              </a-form-item>

              <a-form-item field="language" label="Language">
                <a-radio-group v-model="addForm.language">
                  <a-radio value="Chinese">Chinese</a-radio>
                  <a-radio value="English">English</a-radio>
                  <a-radio value="Bilingual">Bilingual</a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item field="teacher" label="Teacher" :rules="teacherRule">
                <a-input v-model="addForm.teacher"></a-input>
              </a-form-item>

              <a-form-item field="date" label="Date" :rules="dateRule">
                <a-date-picker format="YYYY/MM/DD" v-model="addForm.date" placeholder="Please select ..." :disabledDate="(current) => dayjs(current).isBefore(dayjs())"/>
              </a-form-item>

              <a-form-item field="time" label="Time" :rules="timeRule">
                <a-time-picker format="HH:mm" v-model="addForm.time" placeholder="Please select ..."/>
              </a-form-item>

              <a-form-item field="location" label="Location">
                <a-select v-model="addForm.location" placeholder="Please select ...">
                  <a-option value="Teaching Building No.1 Lecture Hall">Teaching Building No.1 Lecture Hall</a-option>
                  <a-option value="Research Building Lecture Hall">Research Building Lecture Hall</a-option>
                  <a-option value="Library Conference Hall">Library Conference Hall</a-option>
                  <a-option value="Activity Room">Activity Room</a-option>
                </a-select>
              </a-form-item>

              <a-form-item field="duration" label="Duration" :rules="durationRule">
                <a-input-number v-model="addForm.duration">
                  <template #append>
                    h
                  </template>
                </a-input-number>

              </a-form-item>
            </a-form>
          </div>

        </a-modal>
        <a-modal v-model:visible="editVisible" :on-before-ok="editClass" okText="Submit" cancelText="Exit" width="800px">
          <template #title>
            Edit Class
          </template>
          <div style="display: flex; justify-content: center; padding:20px">
            <a-form ref="formRef" :model="editForm">
              <a-form-item field="name" label="Course Name">
                <a-input v-model="editForm.name" placeholder="please enter your username..."/>
              </a-form-item>
              <a-form-item field="code" label="Course Code">
                <a-input v-model="editForm.code" placeholder="please enter your username..."></a-input>
              </a-form-item>

              <a-form-item field="language" label="Language">
                <a-radio-group v-model="editForm.language">
                  <a-radio value="Chinese">Chinese</a-radio>
                  <a-radio value="English">English</a-radio>
                  <a-radio value="Bilingual">Bilingual</a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item field="teacher" label="Teacher">
                <a-input v-model="editForm.teacher"></a-input>
              </a-form-item>

              <a-form-item field="date" label="Date">
                <a-date-picker format="YYYY/MM/DD" v-model="editForm.date" placeholder="Please select ..."/>
              </a-form-item>

              <a-form-item field="time" label="Time">
                <a-time-picker format="HH:mm" v-model="editForm.time" placeholder="Please select ..."/>
              </a-form-item>
              <a-form-item field="location" label="Location">
                <a-select v-model="editForm.location" placeholder="Please select ...">
                  <a-option value="Teaching Building No.1 Lecture Hall">Teaching Building No.1 Lecture Hall</a-option>
                  <a-option value="Research Building Lecture Hall">Research Building Lecture Hall</a-option>
                  <a-option value="Library Conference Hall">Library Conference Hall</a-option>
                  <a-option value="Activity Room">Activity Room</a-option>
                </a-select>
              </a-form-item>
              <a-form-item field="duration" label="Duration">
                <a-input-number v-model="editForm.duration"></a-input-number>
              </a-form-item>
            </a-form>
          </div>

        </a-modal>

      </div>
    </a-layout-content>
  </a-layout>

  <!--  <div id="main">-->
  <!--    <mavon-editor v-model="value"/>-->
  <!--  </div>-->

</template>

<script>
import dayjs from 'dayjs';
// import TAnimation from "@/components/TAnimation";
// import Header from "@/components/Header";

export default {
  // components: {
  //   TAnimation,
  //   Header
  // },
  data() {
    return {
      dayjs,
      columns: [
        {
          title: 'Course Name',
          dataIndex: 'name',
        }, {
          title: 'Course Code',
          dataIndex: 'code'
        },
        {
          title: 'Language',
          dataIndex: 'language'
        },
        {
          title: 'Teacher',
          dataIndex: 'teacher'
        },
        {
          title: 'Date',
          dataIndex: 'date'
        },
        {
          title: 'Time',
          dataIndex: 'time'
        },
        {
          title: 'Location',
          dataIndex: 'location',
        },
        {
          title: 'Duration',
          dataIndex: 'duration',
          slotName: 'duration'
        },
        {
          title: 'Optional',
          slotName: 'optional'
        }
      ],
      data: [
        {
          name: 'OOAD',
          code: 'CS309',
          language: 'English',
          teacher: 'XXX',
          date: '2022/09/30',
          time: '19:00',
          location: 'Activity Room',
          duration: 3
        },
        {
          name: 'How to Study CS',
          code: 'CS666',
          language: 'Bilingual',
          teacher: 'XXX',
          date: '2022/09/29',
          time: '16:20',
          location: 'Research Building Lecture Hall',
          duration: 2.5
        }
      ],
      addVisible: false,
      addForm: {
        name: '',
        code: '',
        language: 'Chinese',
        teacher: '',
        date: '',
        time: '',
        location: 'Teaching Building No.1 Lecture Hall',
        duration: '',
      },

      index: '',
      editVisible: false,
      editForm: {
        name: '',
        code: '',
        language: '',
        teacher: '',
        date: '',
        time: '',
        location: '',
        duration: '',
      },

      nameRule: [
        {required: true, message: 'Course name is required'},
        {match: /^[a-z]+$/i, message: 'Course name should be English letters'}
      ],

      codeRule: [
        {required: true, message: 'Course code is required'},
        {match: /^[a-z]+[0-9]+|[0-9]+[a-z]+$/i, message: 'Course code should be a combination of letters and numbers'}
      ],

      teacherRule: [
        {required: true, message: 'Teacher name is required'},
        {match: /^[a-z]+$/i, message: 'Teacher name should be English letters'}
      ],

      dateRule: [
        {required: true, message: 'Date is required'}
      ],

      timeRule: [
        {required: true, message: 'Time is required'}
      ],

      durationRule: [
        {required: true, message: 'Duration is required'},
      ],

      languageRule: [
        {required: true, message: 'Duration is required'},
      ],


    }
  },

  methods: {
    async addClass() {

      console.log(this.addForm)
      var flag = true

      if (this.addForm.name === '') {
        this.$refs.formRef.setFields({
          name: {
            status: 'error',
            message: 'Course name is required'
          }
        })
        flag = false
      } else if (!/^[a-z]+$/i.test(this.addForm.name)) {
        this.$refs.formRef.setFields({
          name: {
            status: 'error',
            message: 'Course name should be English letters'
          }
        })
        flag = false
      }

      if (this.addForm.code === '') {
        this.$refs.formRef.setFields({
          code: {
            status: 'error',
            message: 'Course code is required'
          }
        })
        flag = false
      } else if (!/^[a-z]+[0-9]+|[0-9]+[a-z]+$/i.test(this.addForm.code)) {
        this.$refs.formRef.setFields({
          code: {
            status: 'error',
            message: 'Course code should be a combination of letters and numbers'
          }
        })
        flag = false
      }

      if (this.addForm.teacher === '') {
        this.$refs.formRef.setFields({
          teacher: {
            status: 'error',
            message: 'Teacher name is required'
          }
        })
        flag = false
      } else if (!/^[a-z]+$/i.test(this.addForm.teacher)) {
        this.$refs.formRef.setFields({
          teacher: {
            status: 'error',
            message: 'Teacher name should be English letters'
          }
        })
        flag = false
      }

      if (this.addForm.date === '') {
        this.$refs.formRef.setFields({
          date: {
            status: 'error',
            message: 'Date couldn\'t be null'
          }
        })
        flag = false
      }

      if (this.addForm.time === '') {
        this.$refs.formRef.setFields({
          time: {
            status: 'error',
            message: 'Time couldn\'t be null'
          }
        })
        flag = false
      }

      if (this.addForm.duration === '') {
        this.$refs.formRef.setFields({
          duration: {
            status: 'error',
            message: 'Duration is required'
          }
        })
        flag = false
      }

      if (flag) {
        let result = this.data.some((item) => {
          if(this.addForm.location===item.location &&
              !(dayjs(item.date+item.time).isAfter(dayjs(this.addForm.date+this.addForm.time).add(this.addForm.duration, 'hour'))
                  ||dayjs(item.date+item.time).isSame(dayjs(this.addForm.date+this.addForm.time).add(this.addForm.duration, 'hour'))
                  ||dayjs(this.addForm.date+this.addForm.time).isAfter(dayjs(item.date+item.time).add(item.duration, 'hour'))
                  ||dayjs(this.addForm.date+this.addForm.time).isSame(dayjs(item.date+item.time).add(item.duration, 'hour')))){

            this.$message.error('Any two different courses cannot share one room at the same time.')
            return true;
          }

          if(item.code===this.addForm.code && item.name!==this.addForm.name){
            this.$message.error('Different courses should have different course codes')
            return true;
          }
          if (item.teacher === this.addForm.teacher && item.date === this.addForm.date) {
            this.$message.error('Each teacher can take no more than one lecture per day')
            return true;
          }
          if (item.code === this.addForm.code && item.date === this.addForm.date) {
            this.$message.error('One course is scheduled at most once a day.')
            return true;
          }
          return false
        })

        if (!result) {
          this.data.push(JSON.parse(JSON.stringify(this.addForm)))

          this.$message.success('success')
          for(let key in this.addForm){
            this.addForm[key]  = ''
          }
          this.addForm.language='Chinese'
          this.addForm.location='Teaching Building No.1 Lecture Hall'
          return true
        } else return false
      }else return false

    },

    beforeEdit(rowIndex) {
      this.editVisible = true;
      this.index = rowIndex;
      this.editForm = JSON.parse(JSON.stringify(this.data[rowIndex]))
    },

    async editClass() {
      this.data[this.index] = this.editForm
      this.$message.success('success')
      return true
    },

    deleteClass(rowIndex) {
      this.data.splice(rowIndex, 1)
      this.$message.success('success')
    }
  },

}
</script>


<style>
.container {
  display: flex;
  justify-content: center;
  position: relative;
}

.top-side {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
