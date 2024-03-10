<template>
    <div class="form-login-container">
        <div class="form-login-content flex-column">
            <h2>Entre com seus dados de acesso.</h2>
            <form @submit.prevent="submitLogin">

                <ui-input 
                    label="Nome de usuário ou e-mail:"
                    id="user"
                    design="xl"
                    :value="user"
                    v-model="user"
                    ></ui-input>
                    
                <ui-input 
                    type="password"
                    label="Senha:"
                    id="password"
                    design="xl"
                    :value="password"
                    v-model="password"
                    ></ui-input>

                <ui-button
                    type="submit"
                    color="#fff"
                    design="xxl sucess"
                    :loading="loading">Entrar</ui-button>

                <div class="message-error" v-show="showError">
                    <p>Usuário ou senha inválidos, tente novamente</p>
                </div>
                <a href="#">Esqueci minha senha</a>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useLocalStorage from '@/composable/useLocalStorage '
import UiInput from '@/components/ui/ui-input'
import UiButton from '@/components/ui/ui-button'

export default {
    name: 'ViewFormLogin',
    components:{
        UiInput,
        UiButton
    },
    setup() {
        const { saveData, recebeDados } = useLocalStorage()

        saveData()

        const user = ref('')
        const password = ref('')
        const showError = ref(false)
        const loading = ref(false)

        function submitLogin() {
            loading.value = true

            setTimeout(() => {
                showError.value = recebeDados(user.value, password.value)
                loading.value = false
            }, "2000");
        }

        return { user, password, submitLogin, showError, loading }
    },
};
</script>

<style lang="stylus" scoped>
  @import '../assets/stylus/style.styl'; 
</style>
