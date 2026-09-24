import { z } from "zod"

export const registryItemTypeSchema = z.enum([
  "registry:lib",
  "registry:block",
  "registry:component",
  "registry:ui",
  "registry:hook",
  "registry:theme",
  "registry:page",
  "registry:style",
  "registry:file",
  "registry:example",
])

export const registryItemFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: registryItemTypeSchema.optional(),
  target: z.string().optional(),
})

export const registryItemTailwindSchema = z.object({
  config: z.record(z.any()).optional(),
})

export const registryItemCssVarsSchema = z.object({
  light: z.record(z.string()).optional(),
  dark: z.record(z.string()).optional(),
})

export const registryItemSchema = z.object({
  name: z.string(),
  type: registryItemTypeSchema,
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema).optional(),
  tailwind: registryItemTailwindSchema.optional(),
  cssVars: registryItemCssVarsSchema.optional(),
  meta: z.record(z.any()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
  title: z.string().optional(),
})

export const registryIndexSchema = z.array(registryItemSchema)

export type RegistryItem = z.infer<typeof registryItemSchema>
export type Registry = {
  name: string
  homepage?: string
  items: RegistryItem[]
}
