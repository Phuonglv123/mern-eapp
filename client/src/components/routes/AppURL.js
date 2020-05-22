class AppURL {
    login() {
        return '/login'
    }

    home() {
        return '/'
    }

    dashboard() {
        return '/dashboard'
    }

    product() {
        return '/product'
    }

    category() {
        return '/category'
    }

    createOrUpdateCategory(action) {
        return `/category/${action}`
    }

    createOrUpdateProduct(action) {
        return `/product/${action}`
    }
}

export default new AppURL();
