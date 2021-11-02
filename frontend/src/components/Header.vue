<template>
  <div id="nav">
    <header>
      <nav class="navbar">
        <div class="logo">
          LOGO - Hardware-Deals 
        </div>
        <div class="links">
          <router-link to="/">
            <fa class="headerIcons" icon="home"></fa> 
            Home
          </router-link>
          <router-link to="/profile" class="profile">
            <fa class="headerIcons" icon="user"></fa> 
            Profile
          </router-link>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>


<style scoped>
a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  margin: 0 25px;
}
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
}
.links{
  display: flex;
}
a:hover{
  color: #045E07
}
.navbar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d6d6d6;
  padding: 25px;
}
.profile{
  align-self: flex-end;
}
</style>
