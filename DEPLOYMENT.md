# 工厂设备管理系统 - 部署指南

## 环境要求

- Node.js 16.x 或更高版本
- npm 7.x 或更高版本

## 安装依赖

```bash
npm install
```

## 开发环境运行

```bash
npm run dev
```

项目将在 http://localhost:5173 上运行。

## 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

## 预览生产版本

```bash
npm run preview
```

## 部署到静态网站托管服务

### Vercel

1. 登录 Vercel 账号
2. 点击 "New Project"
3. 选择你的代码仓库
4. 配置构建命令：`npm run build`
5. 配置输出目录：`dist`
6. 点击 "Deploy"

### Netlify

1. 登录 Netlify 账号
2. 点击 "Add new site"
3. 选择 "Import an existing project"
4. 连接你的代码仓库
5. 配置构建命令：`npm run build`
6. 配置发布目录：`dist`
7. 点击 "Deploy site"

### GitHub Pages

1. 在 `package.json` 中添加 `homepage` 字段：
   ```json
   "homepage": "https://your-username.github.io/device-manager"
   ```

2. 安装 `gh-pages` 包：
   ```bash
   npm install --save-dev gh-pages
   ```

3. 在 `package.json` 中添加部署脚本：
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

4. 构建并部署：
   ```bash
   npm run build
   npm run deploy
   ```

## 环境变量配置

创建 `.env` 文件，添加以下环境变量：

```env
# API 基础 URL
VITE_API_BASE_URL=http://your-api-server.com/api

# 认证相关
VITE_AUTH_CLIENT_ID=your-client-id
VITE_AUTH_CLIENT_SECRET=your-client-secret
```

## 注意事项

1. 确保在生产环境中使用真实的 API 服务
2. 配置适当的 CORS 策略以允许前端访问后端 API
3. 生产环境中应使用 HTTPS 协议
4. 定期更新依赖包以确保安全性
