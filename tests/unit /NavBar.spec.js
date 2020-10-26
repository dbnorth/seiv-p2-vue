import Vue from 'vue';
import Vuetify from 'vuetify';
import NavBar from '@/components/NavBar';
import Utils from '@/utils/utils';


// Utilities
import { createLocalVue, mount } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();

jest.mock('@/utils/utils', ()=>({
  getStore: jest.fn()
  })
);




describe('NavBar Test', () => {
  let testNum =0;
  let vuetify;
  let wrapper = null;

  beforeEach(() => {
    vuetify = new Vuetify();




  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    
  });

  
  test('if a user is Admin show corret Menu Options', async () => {
    let user = {user:'John', roles:'Admin'};
    Utils.getStore.mockImplementation(() => user);

    wrapper = mount(NavBar,
      { 
        stubs: ['router-link'],
        localVue,
        vuetify
      });

 //   await wrapper.setData({ isAdmin: true }); // setting our data value
    wrapper.vm.$nextTick() ;
    expect(wrapper.findComponent( {ref : "home"}).exists()).toBe(true);
    expect(wrapper.findComponent( {ref : "logout"}).exists()).toBe(true);
    expect(wrapper.findComponent( {ref : "advisor-edit"}).exists()).toBe(true);
    expect(wrapper.findComponent( {ref : "student-list"}).exists()).toBe(true);
    expect(wrapper.findComponent( {ref : "advisor-list"}).exists()).toBe(true);
    expect(wrapper.findComponent( {ref : "course-list"}).exists()).toBe(true);
    expect(wrapper.findComponent( {ref : "semester-list"}).exists()).toBe(true);
    expect(wrapper.findComponent( {ref : "degree-list"}).exists()).toBe(true);

  });


  test('if correct user name is shows on nav bar', async () => {
    let user = {user:'James', roles:'Admin'};
    Utils.getStore.mockImplementation(() => user);

    wrapper = mount(NavBar,
      { 
        stubs: ['router-link'],
        localVue,
        vuetify
      });

      wrapper.vm.$nextTick() ;
      expect(wrapper.findComponent( {ref : "toolbar-title"}).text()).toBe("Course Plan (logged in as James)");

});


test('if a user is Advisor show corret Menu Options', async () => {
  let user = {user:'John', roles:'Advisor'};
  Utils.getStore.mockImplementation(() => user);

  wrapper = mount(NavBar,
    { 
      stubs: ['router-link'],
      localVue,
      vuetify
    });
     wrapper.vm.$nextTick() ;
     expect(wrapper.findComponent( {ref : "home"}).exists()).toBe(true);
     expect(wrapper.findComponent( {ref : "logout"}).exists()).toBe(true);
     expect(wrapper.findComponent( {ref : "advisor-edit"}).exists()).toBe(true);
     expect(wrapper.findComponent( {ref : "student-list"}).exists()).toBe(true);
 
   });

});