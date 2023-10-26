<template>
    <div>
        <Header></Header>
        <section>
            <div class="container">
                <Title title="Дома"></Title>
            </div>
        </section>
        <Footer></Footer>
        <ModalCreate title="Добавление дома"></ModalCreate>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Title from '@/components/Title.vue';
import Footer from '@/components/Footer.vue';
import ModalCreate from '@/components/ModalCreate.vue';

export default {
    components: {
        Header,
        Title,
        Footer,
        ModalCreate
    }
}
</script>