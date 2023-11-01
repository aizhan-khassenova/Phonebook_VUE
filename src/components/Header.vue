<template>
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span class="fs-4"><strong>Телефонный Справочник</strong></span>
        </a>

        <ul class="nav nav-pills">
            <li class="nav-item"><router-link to="/" class="nav-link"><strong>Контакты</strong></router-link></li>
            <li class="nav-item"><router-link to="/apartment" class="nav-link"><strong>Квартиры</strong></router-link></li>
            <li class="nav-item"><router-link to="/house" class="nav-link"><strong>Дома</strong></router-link></li>
            <li class="nav-item"><router-link to="/street" class="nav-link"><strong>Улицы</strong></router-link></li>
            <li class="nav-item"><router-link to="/city" class="nav-link"><strong>Города</strong></router-link>
            </li>
        </ul>
    </header>
</template>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/city.css"></style>

<style scoped>
/* header */
header {
	background-color: var(--gray-color);
}
</style>