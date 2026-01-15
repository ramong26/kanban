export type CardPriority = "low" | "medium" | "high";
export type CardStatus = "todo" | "in-progress" | "done";

export interface CardProps {
  id: string;
  title: string;
  status: CardStatus;
  dateCreated: string;
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
