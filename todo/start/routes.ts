import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const TodosController = () => import('#controllers/todos_controller')
const AuthController = () => import('#controllers/auth_controller')
router.on('/').renderInertia('home')

router.group(() => {
  router.get('/login', ({ inertia }: HttpContext) => {
    return inertia.render('auth/login')
  })
  router.get('/register', ({ inertia }: HttpContext) => {
    return inertia.render('auth/regist')
  })
})

router.post('/register', [AuthController, 'registerUser'])
router.post('/login', [AuthController, 'loginUser'])

router
  .group(() => {
    router.get('/update-todo/:id', async ({ params, inertia, auth }: HttpContext) => {
      const user = await auth.authenticate()

      const todo = await user.related('todos').query().where('id', params.id).firstOrFail()

      return inertia.render('landing/update', {
        todos: todo,
      })
    })
    router.get('/dashboard', async ({ inertia, auth }: HttpContext) => {
      const user = await auth.authenticate()
      await user.load('todos')
      console.log(user.todos)

      return inertia.render('landing/dashboard', {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        todos: user.todos, // ini array todo-nya
      })
    })

    router.get('/create', async ({ inertia }: HttpContext) => {
      return inertia.render('landing/create')
    })
    router.post('/logout', [AuthController, 'logOut'])
    router.post('/create-todo', [TodosController, 'createTodo'])
    router.delete('/delete-todo/:id', [TodosController, 'deleteTodo'])
    router.put('/update-todo/:id', [TodosController, 'updateTodo'])
    router.get('/get-todo', [TodosController, 'getTodo'])
    router.get('/profile', async ({ inertia, auth }: HttpContext) => {
      const user = await auth.authenticate()
      await user.load('todos')
      return inertia.render('landing/profile', {
          user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        todos: user.todos
      })
    })
  })
  .use(
    middleware.auth({
      guards: ['web'],
    })
  )
