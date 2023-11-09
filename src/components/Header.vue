<template>
    <div class="header-container">
        <div class="container">
            <div class="header">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 link-body-emphasis text-decoration-none">
                    <h3>
                        <strong id="phone">Телефoнный</strong>
                    </h3>

                    <h3>
                        <strong id="book">Справ</strong>
                    </h3>

                    <h5>
                        <i class="bi bi-person-circle" id="book"></i>
                    </h5>

                    <h3>
                        <strong id="book">чник</strong>
                    </h3>

                    <h3>
                        <strong id="dote">.</strong>
                    </h3>
                </a>

                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">
                            <strong>Контакты</strong>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/apartment" class="nav-link" :class="{ 'active': $route.path === '/apartment' }">
                            <strong>Квартиры</strong>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/house" class="nav-link" :class="{ 'active': $route.path === '/house' }">
                            <strong>Дома</strong>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/street" class="nav-link" :class="{ 'active': $route.path === '/street' }">
                            <strong>Улицы</strong>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/city" class="nav-link" :class="{ 'active': $route.path === '/city' }">
                            <strong>Города</strong>
                        </router-link>
                    </li>
                </ul>

                <div class="search">
                    <form class="d-flex" role="search">
                        <input class="form-control me-2 bg-transparent d-inline-flex focus-ring focus-ring-light text-decoration-none border rounded-2" type="search" placeholder="Поиск..." aria-label="Поиск">
                        <button class="btn btn-primary btn-search" type="submit"><i class="bi bi-search"></i></button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>

<style scoped>
.btn-search {
    background-color: var(--bs-btn-hover-bg);
    border-radius: 50%;
	height: 40px;
	width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-container {
    width: 100vw;
    background-color: var(--bs-primary);
}

.container {
    height: 73px;
    width: 1320px;
    display: flex;
    align-items: flex-end;
    padding-left: 0;
}

.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.search {
    margin-top: 2px;
    margin-bottom: 2px;
    width: 360px;
    /* border: 1px solid black; */
}

ul{
    /* border: 1px solid black; */
}

a{
    /* border: 1px solid black; */

}

.input{
    color: white;
}

.nav-tabs .nav-link {
    background-color: var(--bs-secondary-bg);
    border: 2px solid var(--bs-primary);
    border-bottom: 3px solid var(--bs-primary);
}

.nav-tabs:hover .nav-link:hover {
    background-color: var(--secondary-color);
}

.nav-tabs .nav-link.active {
    background-color: var(--gray-color);
    color: #2c3e50;
    border-bottom: 3px solid var(--gray-color);
}

.nav-tabs:hover .nav-link.active:hover {
    background-color: var(--gray-color);
}

#phone {
    color: var(--bs-body-color);
}

#book {
    color: var(--gray-color);
}

#dote {
    color: var(--bs-body-color);
}
</style>