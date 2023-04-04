<template>
  <div class="app">
    <div v-if="state.account.id">
      안녕하세요? {{ state.account.name }}님!
      <button @click="logout()">로그아웃</button>
    </div>
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
    const state = reactive({
      account:{
        id:null,
        name: "",
      },
      form:{
        loginId:"",
        loginPw:""
      },
      loggedIn: false,
    });

    const submit = () => {
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

    const logout =() =>{
      axios.delete("/api/account").then(()=>{
        alert("로그아웃했습니다");
        state.account.id = null;
        state.account.name = "";

      })
    }

    axios.get("/api/account").then((res) => {
      state.account = res.data;
      // state.loggedIn 
    });

    return { state, submit, logout };

    // return { state };
  },
};

</script>
