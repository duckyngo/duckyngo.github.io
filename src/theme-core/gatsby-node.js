const kebabCase = require(`lodash.kebabcase`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions

  const customSlug = (source) => {
    const title = kebabCase(source.title)
    const date = new Date(source.date)
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1
    const slug = source.slug ? source.slug : `${year}/${month}/${title}`

    return `/${slug}`.replace(/\/\/+/g, `/`)
  }

  createFieldExtension({
    name: `customSlug`,
    extend() {
      return {
        resolve: customSlug,
      }
    },
  })

  createTypes(`
    interface Post @nodeInterface {
      slug: String! @customSlug
    }
    
    type MdxPost implements Node & Post {
      slug: String! @customSlug
    }
  `)
}