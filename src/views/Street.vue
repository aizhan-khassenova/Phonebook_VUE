<template>
    <div>
        <Header></Header>
        <section>
            <div class="container">
                <Title title="Улицы"></Title>

                <!-- <Table dataType="streets"></Table> -->
            </div>
        </section>
        <Footer></Footer>
        <ModalCreate title="Добавление улицы"></ModalCreate>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Title from '@/components/Title.vue';
import Footer from '@/components/Footer.vue';
import ModalCreate from '@/components/ModalCreate.vue';
// import Table from '@/components/Table.vue';

export default {
    components: {
        Header,
        Title,
        Footer,
        ModalCreate,
        // Table
    }
}
</script>