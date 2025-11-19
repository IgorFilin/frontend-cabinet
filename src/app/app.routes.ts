import { Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { authGuard } from './core/guard/auth-guard';
import { KnowledgeBaseComponent } from './pages/knowledgeBase/knowledgeBase.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { MainComponent } from './pages/main/main.component';
import { canDeactivateGuard } from './core/guard/can-deactivate-guard';
import { ArticleComponent } from './pages/article/article.component';
import { PermissionGuard } from './core/guard/permission-guard';
import { ChatComponent } from './pages/chat/chat.component';
import { TerminalComponent } from './pages/terminal/terminal.component';
import { GamesComponent } from './pages/games/games.component';
import { PublicGuard } from './core/guard/public-guard';

export const routes: Routes = [
  // { path: '', canActivate: [authGuard] , component: MainComponent },
  { path: '', redirectTo: 'knowledgeBase', pathMatch: 'full' },
  { component: RegistrationComponent, path: 'registration' },
  { component: LoginComponent, path: 'login', canActivate: [PublicGuard] },
  { component: ConfirmComponent, path: 'confirm' },
  {
    component: QuestionsComponent,
    path: 'questions',
    canActivate: [authGuard, PermissionGuard],
  },
  {
    component: KnowledgeBaseComponent,
    path: 'knowledgeBase',
    canActivate: [authGuard],
  },
  {
    component: CreateArticleComponent,
    path: 'articles',
    canActivate: [authGuard],
    canDeactivate: [canDeactivateGuard],
  },
  {
    component: ArticleComponent,
    path: 'article/:id',
    canActivate: [authGuard],
  },
  {
    component: ChatComponent,
    path: 'chat',
    canActivate: [authGuard],
  },
  {
    component: GamesComponent,
    path: 'games',
    canActivate: [authGuard],
  },
  {
    component: TerminalComponent,
    path: 'terminal',
    canActivate: [authGuard],
  },
];
