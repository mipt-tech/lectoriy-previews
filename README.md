# Генератор превьюшек для [Лектория ФПМИ](https://www.youtube.com/channel/UCdxesVp6Fs7wLpnp1XKkvZg/videos)
Генератор упрощает создание превьюшек для лекций:
1. Не требуется владение Фотошопом, соответственно, понижается порог входа;
2. После отрисовки первой превьюшки последующие создаются невероятно малыми усилиями.

Генератор работает прямо в браузере и использует [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) для работы с графикой.
Создание превью можно прервать в любой момент, а уже нарисованное переиспользовать сколько угодно раз: состояние хранится в `localStorage`.

## Разработка
Необходимая теоретическая база: JavaScript, React (with Hooks), Redux.

### Запуск проекта
Должны быть установлены:
- Node.js версии 16;
- NPM (Node Package Manager).

После этого из корня склонированного репозитория нужно выполнить команды
```shell
npm install
npm start
```
И по адресу http://localhost:3000/ будет доступна локальная версия генератора.

### Линтер
Для поддержания хороших практик и чистоты кода используются ESLint и Prettier соответственно.
Рекомендуется настроить редактор кода, чтобы он автоматически подсвечивал огрехи, обнаруженные линтером.
Для этого достаточно установить расширение по имени ESLint (у Visual Studio Code и WebStorm оно точно имеется).

Проверить проект линтером можно командой
```shell
npx eslint --ext .jsx,.js src
```

Без одобрения линтером код не задеплоится в прод.

## Деплой в продакшн
Команду `npm start` можно использовать только для режима разработки.
Смысл этого режима в том, чтобы не компилировать приложение заново после каждого изменения в коде.
Цена этому — увеличенный во много раз вес итоговой веб-страницы (на момент написания этого предложения — **5 Мб**).
Это не критично при локальной разработке, но критично, когда итоговый сайт размещается в интернете.
Для выкатывания проекта на публику нужно выполнить
```shell
npm install
npm run build
```
В результате будет создана папка **public**, из корня которой можно запускать статический сервер.
Вес итоговой страницы будет в разы меньше (на момент написания этого предложения — **1 Мб**).

## Устройство проекта
### Структура папок
- **assets**: Всё, что не код и не конфигурационные файлы: вспомогательные изображения, шрифты.
  Кстати, шрифт специально изменён, чтобы расстояние между буквами соответствовало брендбуку.
- **src/components**: Элементы интерфейса. Всё, что происходит на глазах у пользователя.
- **src/components/Control**: Управление внешним видом превьюшки.
- **src/components/Control/edit**: Текстовые поля, слайдеры, переключатели... В общем, вся приборная панель справа от превью.
- **src/components/Control/silhouette**: Диалоговое окно для вставки силуэта преподавателя.
- **src/components/Preview**: Предпросмотр результата (контейнер для трёх картинок разного размера).
- **src/components/Preview/Thumbnail**: Компонент для рендера предпросмотра.
  Используется предыдущим компонентом три раза (на самом деле четыре: четвёртый раз &mdash; в невидимом виде &mdash; для генерации конечного результата в Full HD).
- **src/store**: Код Redux-хранилища &mdash; глобального состояния приложения. Именно это состояние синхронизируется с localStorage. Конечно, хранится не всё состояние веб-странички целиком, а лишь информация, достаточная для генерации превьюшки (название курса, силуэт лектора и т. д.)
- **src/util**: В представлении не нуждается, такая папка есть в любом проекте независимо от языка программирования.
