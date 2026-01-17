export type CardPriority = "all" | "low" | "medium" | "high";
export type CardStatus = "all" | "todo" | "in-progress" | "done";

export interface CardProps {
  id: string;
  title: string;
  status: CardStatus;
  priority: CardPriority;
  createdAt: string;
  updatedAt: string;

  /**
   * @description optional
   */
  description?: string;
  tags?: string[];
  assignee?: string;
  dueDate?: string;
}
