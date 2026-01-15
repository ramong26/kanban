export type CardPriority = "low" | "medium" | "high";
export type CardStatus = "todo" | "in-progress" | "done";

export interface CardProps {
  id: string;
  title: string;
  description: string;
  status: CardStatus;
  dateCreated: string;
  priority: CardPriority;
  createdAt: string;
  updatedAt: string;

  /**
   * @description optional
   */
  tags?: string[];
  assignee?: string;
  dueDate?: string;
}
