.PHONY: dev build lint deploy


dev: ## Start development server
	npm run dev

all: dev

build: ## Build the application
	npm run build

lint: ## Run ESLint
	npm run lint

check: build lint

# Vercel deployment commands
deploy: ## Deploy to Vercel production
	npx vercel --prod


