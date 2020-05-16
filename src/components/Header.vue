<template>
    <div class="navbar navbar-expand-lg navbar-dark justify-content-center">
        <div class="d-flex w-50 order-0">
            <a class="navbar-brand mr-0 mr-md-2 logo-font" to="/">
                <img src="@/assets/icon.png" height="32" loading="lazy">
                駒場小空間
            </a>
        </div>

        <div class="navbar-nav-scroll justify-content-center order-2 container">
            <ul class="navbar-nav bd-navbar-nav flex-row nav-font row col-sm-auto justify-content-center">
                <li class="nav-item mr-2"><router-link class="nav-link" to="/">
                    Home
                </router-link></li>
                <li class="nav-item mr-2"><router-link class="nav-link" to="about">
                    About
                </router-link></li>
                <li class="nav-item mr-2 text-nowrap"><router-link class="nav-link" to="users">
                    使用団体の方へ
                </router-link></li>
            </ul>
            <ul class="navbar-nav bd-navbar-nav flex-row nav-font row col-sm-auto justify-content-center">
                <li class="nav-item mr-2 text-nowrap"><router-link class="nav-link" to="manuals">
                    利用に際して
                    </router-link></li>
                <li class="nav-item mr-1"><router-link class="nav-link" to="access">
                    アクセス
                </router-link></li>
            </ul>
        </div>

        <span class="navbar-text small w-50 text-right order-1 order-md-last"><b>Komaba Multi-purpose Hall</b></span>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.logo-font {
    font-family: "HiraKakuProN-W6";
    font-size: 16pt;
}
.nav-font {
    font-family: "Century";
    font-weight: bold;
}

.navbar {
    background-color: #e65c53;
    overflow: hidden;
}

</style>
