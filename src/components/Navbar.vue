<template>
  <div>
    <div class="color-box"></div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="../../static/favicon.png" width="40" height="40" class="d-inline-block align-top">
      </a>
      <div class="navbar-brand abs">Free Throw Pro</div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  height: 80px;
  background-color: #6F263D;
  margin-bottom: 0;
  border-top: 5px solid #041E42;
}

.navbar-brand.abs {
  padding-left: 5px;
  color: #FFB81C;
  line-height: 35px;
  font-size: 37px;
  font-family: 'Permanent Marker', cursive;
}

.table {
  margin-top: 20px;
}

.title-icon {
  height: 50px;
  width: 50px;
}

.navbar a {
  padding-left: 16px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-top: 11px;
}

.color-box {
  height: 10px;
  width: 100%;
  background-color: #FFB81C;
}
</style>
