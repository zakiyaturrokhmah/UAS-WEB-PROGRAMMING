import Todo from '#models/todo'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  public async createTodo({ request, response, auth }: HttpContext) {
    const { title, description, start_date, end_date } = request.only([
      'title',
      'description',
      'start_date',
      'end_date',
    ])

    const requiredFields = ['title', 'description', 'start_date', 'end_date']

    for (const field of requiredFields) {
      if (!request.input(field)) {
        return response.status(400).json({ msg: `Please fill ${field}` })
      }
    }

    await Todo.create({
      userId: auth.user!.id,
      title,
      description,
      startDate: start_date,
      endDate: end_date,
    })

    return response.redirect('/dashboard')
  }

  public async deleteTodo({ response, auth, params }: HttpContext) {
    const todoId = params.id
    console.log(todoId)

    const todo = await Todo.findBy('id', todoId)

    if (!todo) {
      return response.status(404).json({ msg: 'Todo not found' })
    }

    if (todo.userId !== auth.user!.id) {
      return response.status(403).json({ msg: 'Unauthorized to delete this todo' })
    }
    await todo.delete()

    return response.redirect('/dashboard')
  }

  public async updateTodo({ request, response, auth, params }: HttpContext) {
    const { title, description } = request.only(['title', 'description'])

    const todo = await Todo.findBy('id', params.id)

    if (!todo) {
      return response.status(404).json({ msg: 'Todo not found' })
    }

    if (todo.userId !== auth.user!.id) {
      return response.status(403).json({ msg: 'You are not authorized to update this todo' })
    }

    todo.title = title ?? todo.title
    todo.description = description ?? todo.description
    await todo.save()

    return response.redirect('/dashboard')
  }

  public async getTodo({ request, response }: HttpContext) {
    const { id } = request.only(['id'])

    const todo = await Todo.find(id)

    if (!todo) {
      return response.status(404).json({ msg: 'Todo not found' })
    }

    return response.status(200).json({ msg: 'success', todo })
  }
}
