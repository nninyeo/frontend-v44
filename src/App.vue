<template>
  <div class="app">
    
    <!-- 로그인시 -->
    <div v-if="state.account.idNum">
      안녕하세요? {{ state.account.name }}님!
      <button @click="logout()">로그아웃</button>
    </div>

    <!-- 비로그인 -->
    <div v-else>
      <label for="loginId">
        <span>아이디</span>
        <input type="text" id="loginId" v-model="state.form.loginId"/>
      </label>
      <label for="loginPw">
        <span>패스워드</span>
        <input type="text" id="loginPw" v-model="state.form.loginPw"/>
      </label>
      <hr />
      <button @click="submit()">로그인하기</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import { state } from "fs";
import { reactive } from "vue";
// import { submit } from "vue";

export default {
  setup() {

    //초기로그인값들. state는 현재상태므로 중요하다.
    const state = reactive({
      account:{
        idNum:null,
        name: "",
      },
      //로그인 정보를 보내주기위한 form
      form:{
        loginId:"",
        loginPw:""
      },
      loggedIn: false,  
    });

    //로그인버튼시 던질거임
    const submit = () => {
      //객체로 post에 싣어서 던지기위해 args바디를 만들어줌
      const args = {
        loginId: state.form.loginId,
        loginPw: state.form.loginPw
      }

      axios.post("/api/account", args).then((res)=>{
        alert("로그인성공");
        state.account = res.data
        console.log(res);
      }).catch(()=>{
        alert("로그인실패");
      });
    };

    //
    const logout =() =>{
      axios.delete("/api/account").then(()=>{
        alert("로그아웃했습니다");
        state.account.idNum = null;
        state.account.name = "";

      })
    }
    
    //로그인하고있으면 계정정보 받아오기
    // axios.get("localhost:3000/api/account")앞에 호스트는 cors프록시로 인해 사라짐.
    axios.get("/api/account").then((res) => {
      state.account = res.data;
      // state.loggedIn 
    });

    return { state, submit, logout };

    // return { state };
  },
};

</script>
