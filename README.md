# Say Better

Минималистичный React‑чат, который сохраняет сообщения в Supabase и передаёт их LLM (через OpenRouter API) для переформулировки. Можно выбирать "роль" модели: вежливая, саркастичная, грубая и т.д.

Промпты адаптированы под модель gpt-4o-mini с учётом её особенностей восприятия инструкций и устойчивости к prompt-инъекциям.

## Стек

- **Frontend**: React + TypeScript
- **Backend**: Supabase (PostgreSQL + API)
- **LLM API**: OpenRouter
- **UI**: кастомный минимализм, тёмная тема, авто‑scroll, индикация доставки

## Возможности

- Ввод и валидация текста (5-300 символов, не пропускает опасные символы)
- Сохранение сообщений в Supabase
- Получение ответа от LLM по выбранной роли
- Выбор роли (вежливая, грубая, саркастичная, нейтральная, резюмирующая и др.)
- Отображение результатов рядом с исходным сообщением
- Индикация успешной отправки

## Инструкция по запуску проекта Say Better

### 1. Клонирование репозитория
```bash
git clone https://github.com/rozzenant/say-better.git
cd say-better
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка переменных окружения
Переименуйте .env.local.example в .env.local и добавьте указанные ключи:
```bash
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

### 4. Настройка Supabase
Создайте таблицу messages с полями:
```sql
id: bigint
content: text
transformed: text
created_at: timestamp
```

Роль anon должна иметь права на insert/select/update

### 5. Локальный запуск
```bash
npm run dev
```
Перейдите на [http://localhost:5173](http://localhost:5173)

## Инструкция по запуску проекта Say Better через Docker

### 1. Клонируйте репозиторий и перейдите в него
```bash
git clone https://github.com/rozzenant/say-better.git
cd say-better
```

### 2. Замените переменные окружения на ваши через nano или другой текстовый редактор
```bash
nano .env.local.example
```

### 3. Настройка Supabase
Создайте таблицу messages с полями:
```sql
id: bigint
content: text
transformed: text
created_at: timestamp
```
Роль anon должна иметь права на insert/select/update

### 4. Соберите контейнер
```bash
docker compose build
```

### 5. Запустите приложение
```bash
docker compose up -d
```

### 6. Приложение будет доступно по адресу
```
http://<IP-сервера>:25000/main-page
```
