<template>
  <div id="container">
    <footer>
      <a href="/" class="nav-link px-2">
        <h4>
          <i class="bi bi-person-circle" id="book"></i>
        </h4>
      </a>

      <a href="/" class="nav-link px-2">
        <h6 class="text-center">
          Телефонный Справочник <strong>&middot;</strong> 2023
        </h6>
      </a>
    </footer>
  </div>
</template>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>

<style scoped>
#container {
  background-color: var(--black-color);
  display: flex;
  justify-content: center;
  width: 100vw;
}

footer {
  height: 60px;
  color: var(--gray-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
/* #app {
  min-height: calc(100vh - 60px);
  padding-bottom: 60px; 
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  color: var(--gray-color);
  background-color: var(--black-color);
  display: flex;
  justify-content: center;
  align-items: center;
} */
</style>