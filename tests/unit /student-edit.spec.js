import Vue from 'vue';
import Vuetify from 'vuetify';
import StudentEdit from '@/views/student-edit';
import Utils from '@/utils/utils';
import StudentServices from '@/services/StudentServices'
import DegreeServices from '@/services/DegreeServices.js';
import AdvisorServices from '@/services/AdvisorServices.js';
import VueRouter from 'vue-router'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

// set up mocks
jest.mock('@/utils/utils', ()=>({
    getStore: jest.fn()
  })
);

jest.mock('@/services/DegreeServices.js', ()=>({
    getDegrees: jest.fn()
  })
);
jest.mock('@/services/AdvisorServices.js', ()=>({
    getAdvisors: jest.fn()
  })
);
jest.mock('@/services/StudentServices', ()=>(
    {getStudent : jest.fn()}
//    {updateStudent : jest.fn()}
  )
);

// Test
describe('Student Edit Test', () => {

  let vuetify;
  let wrapper = null;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    
  });

  test('if all fields have correct value', async () => {
    let data = {data : {id: "1",
      idNumber: "10000001",
      firstName: "Jack",
      lastName: "Sprat",
      email: "jsprat@eagles.oc.edu",
      degreeId: '',
      advisorId: '',
      gradDate :"04/22/2022",
      roles: "Student"
    }};
    let emptyData = {data: []};

    StudentServices.getStudent.mockResolvedValue(data);
    DegreeServices.getDegrees.mockResolvedValue(emptyData);
    AdvisorServices.getAdvisors.mockResolvedValue(emptyData);

    let user = {user:'Jack', roles:'Student'};
    Utils.getStore.mockImplementation(() => user);
 
    wrapper = mount(StudentEdit,
      { 
        propsdata :{id:"1"},
        stubs: [],
        localVue,
        vuetify

      });
  
    await Vue.nextTick();
   
    expect((wrapper.findComponent( {ref :"idNumber"}).element.__vue__._props.value)).toBe("10000001");
    expect(wrapper.findComponent( {ref : "firstName"}).element.__vue__._props.value).toBe("Jack");
    expect(wrapper.findComponent( {ref : "lastName"}).element.__vue__._props.value).toBe("Sprat");
    expect(wrapper.findComponent( {ref : "email"}).element.__vue__._props.value).toBe("jsprat@eagles.oc.edu");
    expect(wrapper.findComponent( {ref : "deletBtn"}).exists()).toBe(false);

  });
/*
  test('if save button call updateStudnet with cortrect data', async () => {
    let data = {data : {id: "1",
      idNumber: "10000001",
      firstName: "Jack",
      lastName: "Sprat",
      email: "jsprat@eagles.oc.edu",
      degreeId: '',
      advisorId: '',
      gradDate :"04/22/2022",
      roles: "Student"
    }};
    let emptyData = {data: []};

    StudentServices.getStudent.mockResolvedValue(data);
    StudentServices.updateStudent.mockResolvedValue();
    DegreeServices.getDegrees.mockResolvedValue(emptyData);
    AdvisorServices.getAdvisors.mockResolvedValue(emptyData);

    let user = {user:'Jack', roles:'Student'};
    Utils.getStore.mockImplementation(() => user);

    wrapper = mount(StudentEdit,
      { 
        propsdata :{id:"1"},
        stubs: [],
        localVue,
        vuetify
      });
  
      await Vue.nextTick();
      let saveButton = wrapper.findComponent( {ref : "saveBtn"});
      saveButton.trigger('click');

      expect(StudentServices.updateStudent).toHaveBeenCalled();
      expect(StudentServices.updateStudent).toHaveBeenCalledWith(data.data);
      expect(value).toBe(data.data);

  });
*/
});