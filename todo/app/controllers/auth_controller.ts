import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async registerUser({ request, response }: HttpContext) {
    const { username, email, password } = request.only(['username', 'email', 'password'])

    if (!username || !email || !password) {
      return response.status(400).json({ msg: 'please fill the requipment' })
    }

    const isExist = await User.findBy('email', email)

    if (isExist) {
      return response.status(400).json({ msg: 'email already registered' })
    }

    const user = await User.create({ username: username, email: email, password: password })
    console.log(user)

    return response.redirect().toPath('/login')
  }
  public async loginUser({ request, response, auth, inertia }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    if (!email || !password) {
      return response.status(400).json({ msg: 'please fill the requipment' })
    }

    const isUserExist = await User.findBy('email', email)

    if (!isUserExist) {
      return inertia.render('auth/login', {
        errors: {
          email: 'email belum teregistrasi',
        },
      })
    }

    const user = await User.verifyCredentials(email, password)
    console.log(user.password)

    if (!user) {
      return response.status(400).json({ msg: 'email dan pass salah' })
    }

    const test = await auth.use('web').login(user)
    console.log(test)
    response.redirect('/dashboard')
  }

  public async logOut({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect('/login')
  }
}
