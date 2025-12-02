import { Page } from '@playwright/test';

interface User {
  name: string;
  email?: string;
  token?: string;
}

interface Task {
  id: string;
  title: string;
  state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';
}

export async function mockAuth(page: Page, user: User = { name: 'Test User' }) {
  await page.route('**/authenticate', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: { ...user, token: user.token || 'fake-token' },
      }),
    });
  });
}

export async function mockTasks(page: Page, tasks: Task[] = []) {
  await page.route('**/tasks', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ tasks }),
      });
    } else {
      await route.continue();
    }
  });
}

export async function login(
  page: Page,
  email: string = 'test@example.com',
  password: string = 'password'
) {
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard');
}

